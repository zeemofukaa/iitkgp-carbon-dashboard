import { useCarbon } from "../context/CarbonContext";

function GridFactorSelect({ id }) {
  const { gridFactor, setGridFactor, presets } = useCarbon();

  return (
    <select
      id={id}
      aria-label="Grid emission factor"
      value={gridFactor ?? ""}
      onChange={(event) =>
        setGridFactor(
          event.target.value === "" ? null : Number(event.target.value)
        )
      }
    >
      <option value="">As published (IIT Delhi)</option>

      {presets.map((p) => (
        <option key={p.id} value={p.kg_per_kwh}>
          {p.label}, {p.kg_per_kwh} kg/kWh
        </option>
      ))}
    </select>
  );
}

export default GridFactorSelect;
