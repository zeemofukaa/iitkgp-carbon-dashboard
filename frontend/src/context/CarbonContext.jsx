import { createContext, useContext, useEffect, useState } from "react";

import { getJSON } from "../api";

const CarbonContext = createContext(null);

export function CarbonProvider({ children }) {
  // null = results as published in the IIT Delhi inventory
  const [gridFactor, setGridFactor] = useState(null);

  const [state, setState] = useState({
    charts: null,
    explorer: [],
    presets: [],
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      getJSON("/charts", { grid_factor: gridFactor }),
      getJSON("/explorer", { grid_factor: gridFactor }),
      getJSON("/factors"),
    ])
      .then(([charts, explorer, factors]) => {
        if (!cancelled) {
          setState({
            charts,
            explorer,
            presets: factors.grid_presets,
            error: null,
          });
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setState((s) => ({ ...s, error: err.message }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [gridFactor]);

  return (
    <CarbonContext.Provider value={{ ...state, gridFactor, setGridFactor }}>
      {children}
    </CarbonContext.Provider>
  );
}

export function useCarbon() {
  return useContext(CarbonContext);
}
