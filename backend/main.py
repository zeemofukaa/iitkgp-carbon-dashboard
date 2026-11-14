"""IIT campus carbon API.

Pipeline (matches the methodology deck): activity x emission factor -> tCO2e -> scope -> campus total.
Every value carries a status so the dashboard never mixes measured/calculated/reported silently:
  - "calculated": recomputed here as activity x factor (electricity, when a grid factor is chosen)
  - "reported":   taken as published in the IIT Delhi inventory
Run:  uvicorn main:app --reload      Docs: http://localhost:8000/docs
"""
import json
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

DATA = json.loads((Path(__file__).parent / "data" / "iitd_2025.json").read_text())
RECORDS = DATA["records"]
PRESETS = {p["id"]: p for p in DATA["grid_presets"]}

app = FastAPI(
    title="IIT Campus Carbon API",
    version="1.0.0",
    description=(
        "Scope 1/2/3 campus emissions from the published IIT Delhi inventory, "
        "with a grid-factor what-if and data-quality flags."
    ),
)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

GridFactor = Query(
    None,
    gt=0,
    le=2,
    description="Grid emission factor in kgCO2e/kWh. If set, electricity lines are recalculated as kWh x factor; "
    "everything else stays as published. Omit to use the report as published.",
)


def resolve(record: dict, grid_factor: Optional[float]) -> dict:
    """Return the record with its tCO2e for this scenario and a status label."""
    if grid_factor is not None and record.get("is_electricity"):
        tco2e = record["activity_value"] * grid_factor / 1000
        status = "calculated"
        factor = grid_factor
    else:
        tco2e = record["published_tco2e"]
        status = "reported"
        factor = record.get("emission_factor")
    return {
        "id": record["id"],
        "scope": record["scope"],
        "category": record["category"],
        "ghg_category": record.get("ghg_category"),
        "method": record.get("method"),
        "label": record["label"],
        "tco2e": round(tco2e, 4),
        "published_tco2e": record["published_tco2e"],
        "status": status,
        "activity_value": record.get("activity_value"),
        "activity_unit": record.get("activity_unit"),
        "activity_status": record.get("activity_status"),
        "emission_factor": factor,
        "factor_unit": "kgCO2e/kWh" if status == "calculated" else record.get("factor_unit"),
        "factor_source": record.get("factor_source"),
        "notes": record.get("notes"),
    }


def build(grid_factor: Optional[float]) -> list[dict]:
    return [resolve(r, grid_factor) for r in RECORDS]


def totals(rows: list[dict]) -> dict:
    s = {1: 0.0, 2: 0.0, 3: 0.0}
    for r in rows:
        s[r["scope"]] += r["tco2e"]
    total = sum(s.values())
    return {
        "scope1": round(s[1], 2),
        "scope2": round(s[2], 2),
        "scope3": round(s[3], 2),
        "total": round(total, 2),
        "share_pct": {f"scope{k}": round(100 * v / total, 1) for k, v in s.items()},
    }


@app.get("/", tags=["meta"])
def root():
    return {**DATA["meta"], "endpoints": ["/charts", "/explorer", "/scope3", "/summary", "/records", "/hotspots", "/scopes/{1|2|3}", "/scenarios", "/factors", "/quality"]}


@app.get("/summary", tags=["dashboard"])
def summary(grid_factor: Optional[float] = GridFactor):
    """Headline numbers for the dashboard: totals, scope shares, category split, top sources."""
    rows = build(grid_factor)
    t = totals(rows)
    cats: dict = {}
    for r in rows:
        key = (r["scope"], r["category"])
        cats[key] = cats.get(key, 0.0) + r["tco2e"]
    by_category = sorted(
        ({"scope": k[0], "category": k[1], "tco2e": round(v, 2)} for k, v in cats.items()),
        key=lambda x: -x["tco2e"],
    )
    top = sorted(rows, key=lambda r: -r["tco2e"])[:5]
    calc = sum(r["tco2e"] for r in rows if r["status"] == "calculated")
    return {
        "dataset": DATA["meta"]["dataset"],
        "grid_factor_kg_per_kwh": grid_factor,
        "mode": "recalculated electricity" if grid_factor else "as published",
        "totals_tco2e": t,
        "by_category": by_category,
        "top_sources": [{"label": r["label"], "scope": r["scope"], "tco2e": r["tco2e"]} for r in top],
        "status_split_tco2e": {"calculated": round(calc, 2), "reported": round(t["total"] - calc, 2)},
        "data_quality_issues": len(DATA["quality_issues"]),
    }


@app.get("/records", tags=["data"])
def records(
    scope: Optional[int] = Query(None, ge=1, le=3),
    category: Optional[str] = None,
    grid_factor: Optional[float] = GridFactor,
):
    """Line-item table (activity, factor, source, status) for the dashboard's detail view."""
    rows = build(grid_factor)
    if scope:
        rows = [r for r in rows if r["scope"] == scope]
    if category:
        rows = [r for r in rows if r["category"].lower() == category.lower()]
    return {"count": len(rows), "records": rows}


@app.get("/scopes/{scope}", tags=["dashboard"])
def scope_detail(scope: int, grid_factor: Optional[float] = GridFactor):
    """One scope's total and its sources sorted largest first."""
    if scope not in (1, 2, 3):
        raise HTTPException(404, "scope must be 1, 2 or 3")
    rows = sorted((r for r in build(grid_factor) if r["scope"] == scope), key=lambda r: -r["tco2e"])
    total = sum(r["tco2e"] for r in rows)
    return {
        "scope": scope,
        "total_tco2e": round(total, 2),
        "sources": [{**r, "share_pct": round(100 * r["tco2e"] / total, 1)} for r in rows],
    }


@app.get("/scenarios", tags=["what-if"])
def scenarios():
    """Compare the published result against each grid-factor preset side by side."""
    out = [{"id": "published", "label": "As published", "grid_factor": None, **totals(build(None))}]
    for p in PRESETS.values():
        out.append({"id": p["id"], "label": p["label"], "grid_factor": p["kg_per_kwh"], "verified": p["verified"], **totals(build(p["kg_per_kwh"]))})
    base = out[0]["total"]
    for o in out:
        o["delta_vs_published_pct"] = round(100 * (o["total"] - base) / base, 1)
    return out


def scenario_rows() -> list[dict]:
    """Published result plus one row per grid-factor preset, shaped for a stacked bar chart."""
    rows = [("As published", None)] + [(p["short"], p["kg_per_kwh"]) for p in PRESETS.values()]
    out = []
    for name, gf in rows:
        t = totals(build(gf))
        out.append({"name": name, "grid_factor": gf, "scope1": t["scope1"], "scope2": t["scope2"], "scope3": t["scope3"], "emissions": t["total"]})
    return out


@app.get("/charts", tags=["dashboard"])
def charts(grid_factor: Optional[float] = GridFactor):
    """Everything the Overview / Inventory / Scope 3 pages chart, in the shapes the React app already uses."""
    rows = build(grid_factor)
    t = totals(rows)
    by_cat: dict = {}
    for r in rows:
        by_cat[r["category"]] = by_cat.get(r["category"], 0.0) + r["tco2e"]
    ranked = sorted(by_cat.items(), key=lambda kv: -kv[1])
    source_data = [{"name": k, "value": round(v, 2)} for k, v in ranked[:4]]
    source_data.append({"name": "Other", "value": round(sum(v for _, v in ranked[4:]), 2)})
    s3 = scope3_categories(rows)
    return {
        "grid_factor": grid_factor,
        "metrics": {
            **t,
            "sources": len(rows),
            "scope3_categories_reported": sum(1 for c in s3 if c["status"] == "Reported"),
            "scope3_categories_total": len(s3),
        },
        "scopeData": [{"name": f"Scope {i}", "value": t[f"scope{i}"]} for i in (1, 2, 3)],
        "sourceData": source_data,
        "scope3Data": [{"name": c["name"], "value": c["tco2e"]} for c in s3],
        "scenarioData": scenario_rows(),
    }


def scope3_categories(rows: list[dict]) -> list[dict]:
    s3 = [r for r in rows if r["scope"] == 3]
    out = []
    for c in DATA["scope3_categories"]:
        lines = [r for r in s3 if r["ghg_category"] == c["number"]]
        out.append(
            {
                "number": f'{c["number"]:02d}',
                "name": c["name"],
                "title": c["title"],
                "tco2e": round(sum(r["tco2e"] for r in lines), 2),
                "status": "Reported" if lines else "Pending data",
                "lines": [{"label": r["label"], "tco2e": r["tco2e"], "method": r["method"]} for r in lines],
            }
        )
    return out


@app.get("/scope3", tags=["dashboard"])
def scope3():
    """Scope 3 by GHG Protocol category (15), plus its biggest individual lines."""
    rows = build(None)
    cats = scope3_categories(rows)
    total = sum(c["tco2e"] for c in cats)
    largest = max(cats, key=lambda c: c["tco2e"])
    lines = sorted((r for r in rows if r["scope"] == 3), key=lambda r: -r["tco2e"])
    labels = DATA["method_labels"]
    by_method: dict = {}
    for r in lines:
        by_method[r["method"]] = by_method.get(r["method"], 0.0) + r["tco2e"]
    methods = [
        {"method": k, "label": labels[k], "tco2e": round(v, 2), "share_pct": round(100 * v / total, 1)}
        for k, v in sorted(by_method.items(), key=lambda kv: -kv[1])
    ]
    return {
        "total_tco2e": round(total, 2),
        "methods": methods,
        "method_note": DATA["meta"]["method_note"],
        "largest": {"name": largest["name"], "tco2e": largest["tco2e"], "share_pct": round(100 * largest["tco2e"] / total, 1)},
        "categories": cats,
        "top_lines": [{"name": r["label"], "value": r["tco2e"]} for r in lines[:6]],
        "mapping_note": DATA["meta"]["category_mapping_note"],
    }


# Which campus topic each inventory line belongs to (this grouping is the project's, not IIT Delhi's).
TOPICS = [
    ("energy", "Energy", ["s2-academic", "s2-hostel", "s2-bank", "s2-residential", "s1-dg"]),
    ("food", "Food", ["s1-mess", "s1-canteens", "s1-catering", "s3-food"]),
    ("mobility", "Mobility", ["s1-bus", "s1-hospital", "s3-commute", "s3-vans", "s3-visits", "s3-logistics"]),
    ("waste", "Waste", ["s1-waste", "s3-waste", "s3-sold"]),
    ("construction", "Construction", ["s1-construction"]),
    ("other", "Labs, purchasing & other", ["s1-labs", "s1-rnipark", "s1-fugitive", "s3-purchased"]),
    ("water", "Water", []),
]


@app.get("/hotspots", tags=["dashboard"])
def hotspots(grid_factor: Optional[float] = GridFactor):
    """Campus topics (energy, food, mobility, ...) with their emissions, scope split and biggest line."""
    rows = {r["id"]: r for r in build(grid_factor)}
    total = sum(r["tco2e"] for r in rows.values())
    kwh = sum(r["activity_value"] for r in RECORDS if r.get("is_electricity"))
    out = []
    for tid, name, ids in TOPICS:
        lines = sorted((rows[i] for i in ids), key=lambda r: -r["tco2e"])
        t = sum(r["tco2e"] for r in lines)
        item = {
            "id": tid,
            "name": name,
            "status": "Available" if lines else "No data",
            "tco2e": round(t, 2),
            "share_pct": round(100 * t / total, 1),
            "by_scope": {f"scope{n}": round(sum(r["tco2e"] for r in lines if r["scope"] == n), 2) for n in (1, 2, 3)},
            "lines": [{"label": r["label"], "scope": r["scope"], "tco2e": r["tco2e"]} for r in lines],
            "largest": None,
            "lever": None,
        }
        if lines and t:
            item["largest"] = {"label": lines[0]["label"], "share_pct": round(100 * lines[0]["tco2e"] / t, 1)}
        if tid == "energy":
            item["lever"] = {
                "text": "Every 0.1 kgCO2e/kWh on the grid factor moves electricity emissions by this much.",
                "tco2e": round(kwh * 0.1 / 1000, 0),
            }
        out.append(item)
    return {"total_tco2e": round(total, 2), "grid_factor": grid_factor, "mapping_note": "Topic grouping is assigned by this project, not by IIT Delhi.", "topics": out}


@app.get("/explorer", tags=["data"])
def explorer(grid_factor: Optional[float] = GridFactor):
    """Flat table for the Data Explorer page (year, source, scope, category, emissions, status)."""
    rows = sorted(build(grid_factor), key=lambda r: (r["scope"], -r["tco2e"]))
    return [
        {
            "year": 2025,
            "source": r["label"],
            "scope": f'Scope {r["scope"]}',
            "category": r["category"],
            "emissions": round(r["tco2e"], 2),
            "status": "Available" if r["status"] == "reported" else "Calculated",
        }
        for r in rows
    ]


@app.get("/factors", tags=["data"])
def factors():
    """Emission factors in play, with their source and whether we verified them."""
    return {
        "grid_presets": DATA["grid_presets"],
        "reported_factors": [
            {"label": r["label"], "factor": r["emission_factor"], "unit": r["factor_unit"], "source": r["factor_source"]}
            for r in RECORDS
            if r.get("emission_factor")
        ],
    }


@app.get("/quality", tags=["quality"])
def quality():
    """Known inconsistencies in the source report, plus a live reconciliation of stated vs summed totals."""
    rows = build(None)
    summed = totals(rows)
    stated = DATA["stated_totals"]
    recon = {
        k: {"stated": stated[k], "sum_of_lines": summed[k], "difference": round(summed[k] - stated[k], 2)}
        for k in ("scope1", "scope2", "scope3", "total")
    }
    return {"issues": DATA["quality_issues"], "reconciliation_tco2e": recon}
