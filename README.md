# Campus Carbon Intelligence

A dashboard that sorts a campus's greenhouse gas emissions into Scope 1, 2 and 3 and shows how each number was worked out.

The numbers on the dashboard are **IIT Delhi's published 2025 GHG inventory**, used as a reference dataset. They are not IIT Kharagpur measurements. The idea is that the pipeline stays the same when real KGP data replaces the file.

## What it does

- Overview page with every source on campus drawn to scale and coloured by scope
- Step-by-step calculations: electricity (kWh x grid factor) for Scope 2, fuel x emission factor for Scope 1
- A grid factor switcher. Pick a different factor and the whole dashboard recalculates, which shows how much the total depends on that one assumption (about 54,000 to 67,000 tCO2e for the same campus)
- Scope 3 by GHG Protocol category, plus how each line was measured (91% of it is survey-scaled)
- A "campus hotspots" page grouping emissions into energy, food, mobility, waste and so on
- A data explorer with every line item, and a data quality panel listing inconsistencies we found in the source report

## Running it

You need Python 3.10+ and Node 20+.

Backend:

```
cd backend
pip install -r requirements.txt
py -m uvicorn main:app --reload
```

(`python -m uvicorn ...` on Mac/Linux.) It runs on http://localhost:8000, and http://localhost:8000/docs has the interactive API docs.

Frontend, in a second terminal:

```
cd frontend
npm install
npm run dev
```

The frontend looks for the API at `http://localhost:8000`. To change that, copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_URL`.

## How it's put together

```
backend/
  main.py              FastAPI app, all the calculation lives here
  data/iitd_2025.json  the inventory, one record per line item
frontend/
  src/pages/           one file per page
  src/components/      charts, calculation panels, nav, footer
  src/context/         shared state (selected grid factor, API data)
```

Every value follows the same path: activity data x emission factor = tCO2e, then grouped by scope, then summed. Each number carries a status, either reported (taken as published) or calculated (recomputed here), so the two are never mixed up silently.

Main endpoints: `/charts`, `/hotspots`, `/scope3`, `/records`, `/scenarios`, `/factors`, `/quality`. Most take `?grid_factor=0.71` to recalculate electricity.

## Things to know before trusting the numbers

- The data was transcribed by hand from the IIT Delhi report. Check it against the PDF before quoting anything.
- IIT Delhi's own figures don't fully add up. Their Scope 3 lines sum to about 117 t more than their stated total, and their electricity kWh don't reproduce their published tCO2e at the factor they say they used. The dashboard shows both versions rather than hiding it.
- The two CEA grid factors (0.710 and 0.675 kg/kWh) came from a secondary summary and aren't verified against the CEA's own document yet.
- The report gives an emission factor for only 3 of the 11 Scope 1 lines and no fuel quantities. We worked the quantities back from the published emissions, so those rows match by construction. They illustrate the formula, they don't check it.
- Scope 3 category numbers and the "campus hotspots" grouping are our own assignments, not IIT Delhi's.
- A machine learning approach to estimating Scope 3 is left as future work. There aren't enough published campus inventories to train anything meaningful.

## What's next

- Replace the reference data with real IIT Kharagpur data (the JSON file is the only thing that changes)
- Verify the grid factors and the transcribed values
- Deploy it somewhere other than localhost

## Data source

IIT Delhi GHG Emission Inventory Report 2025 (home.iitd.ac.in). Grid factors from the Central Electricity Authority's CO2 Baseline Database.
