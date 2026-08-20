export const yearlyData = [
  { year: "2021", emissions: 21800 },
  { year: "2022", emissions: 21150 },
  { year: "2023", emissions: 20300 },
  { year: "2024", emissions: 19450 },
  { year: "2025", emissions: 18420 },
];

export const sourceData = [
  { name: "Electricity", value: 7850 },
  { name: "Stationary Fuel", value: 4120 },
  { name: "Transportation", value: 2480 },
  { name: "Waste", value: 1150 },
  { name: "Purchased Goods", value: 2820 },
];

export const scopeData = [
  { name: "Scope 1", value: 4120 },
  { name: "Scope 2", value: 7850 },
  { name: "Scope 3", value: 6450 },
];

export const scope3Data = [
  { name: "Purchased goods & services", value: 2820 },
  { name: "Capital goods", value: 520 },
  { name: "Fuel & energy-related", value: 0 },
  { name: "Upstream transportation", value: 0 },
  { name: "Waste generated", value: 1150 },
  { name: "Business travel", value: 1040 },
  { name: "Employee commuting", value: 920 },
  { name: "Upstream leased assets", value: 0 },
  { name: "Downstream transportation", value: 0 },
  { name: "Processing of sold products", value: 0 },
  { name: "Use of sold products", value: 0 },
  { name: "End-of-life of sold products", value: 0 },
  { name: "Downstream leased assets", value: 0 },
  { name: "Franchises", value: 0 },
  { name: "Investments", value: 0 },
];

export const scope3Categories = [
  {
    number: "01",
    title: "Purchased goods & services",
    status: "Prototype",
    description:
      "Emissions associated with goods and services purchased by the institution.",
  },
  {
    number: "02",
    title: "Capital goods",
    status: "Prototype",
    description:
      "Emissions associated with capital goods and major infrastructure purchases, including potentially construction-related embodied emissions.",
  },
  {
    number: "03",
    title: "Fuel- and energy-related activities",
    status: "Pending data",
    description:
      "Upstream emissions associated with purchased fuels and energy that are not included in Scope 1 or Scope 2.",
  },
  {
    number: "04",
    title: "Upstream transportation & distribution",
    status: "Pending data",
    description:
      "Emissions associated with transportation and distribution of purchased goods and services before they reach the institution.",
  },
  {
    number: "05",
    title: "Waste generated in operations",
    status: "Prototype",
    description:
      "Emissions associated with the treatment and disposal of waste generated through campus operations.",
  },
  {
    number: "06",
    title: "Business travel",
    status: "Prototype",
    description:
      "Emissions associated with business travel undertaken for institutional activities.",
  },
  {
    number: "07",
    title: "Employee commuting",
    status: "Prototype",
    description:
      "Emissions associated with employee journeys between home and campus.",
  },
  {
    number: "08",
    title: "Upstream leased assets",
    status: "Pending data",
    description:
      "Emissions associated with assets leased by the institution where they are not already included in Scope 1 or Scope 2.",
  },
  {
    number: "09",
    title: "Downstream transportation & distribution",
    status: "Pending data",
    description:
      "Emissions associated with transportation and distribution occurring after an organization's activities.",
  },
  {
    number: "10",
    title: "Processing of sold products",
    status: "Pending data",
    description:
      "Emissions associated with processing of products sold by the reporting organization.",
  },
  {
    number: "11",
    title: "Use of sold products",
    status: "Pending data",
    description:
      "Emissions associated with the use of products sold by the reporting organization.",
  },
  {
    number: "12",
    title: "End-of-life treatment of sold products",
    status: "Pending data",
    description:
      "Emissions associated with treatment and disposal of products sold by the reporting organization at the end of their life.",
  },
  {
    number: "13",
    title: "Downstream leased assets",
    status: "Pending data",
    description:
      "Emissions associated with assets owned by the institution and leased to other entities.",
  },
  {
    number: "14",
    title: "Franchises",
    status: "Pending data",
    description:
      "Emissions associated with franchise operations where applicable.",
  },
  {
    number: "15",
    title: "Investments",
    status: "Pending data",
    description:
      "Emissions associated with investments where applicable.",
  },
];

export const COLORS = [
  "#0f766e",
  "#2563eb",
  "#d97706",
  "#7c3aed",
  "#64748b",
];

export const scope3HistoricalData = [
  { year: "2021", emissions: 7350 },
  { year: "2022", emissions: 7080 },
  { year: "2023", emissions: 6820 },
  { year: "2024", emissions: 6610 },
  { year: "2025", emissions: 6450 },
];

export const emissionsData = [
  {
    year: 2025,
    source: "Electricity",
    scope: "Scope 2",
    category: "Purchased electricity",
    emissions: 7850,
    status: "Available",
  },
  {
    year: 2025,
    source: "Stationary Fuel",
    scope: "Scope 1",
    category: "Fuel combustion",
    emissions: 4120,
    status: "Available",
  },
  {
    year: 2025,
    source: "Transportation",
    scope: "Scope 3",
    category: "Business travel",
    emissions: 2480,
    status: "Estimated",
  },
  {
    year: 2025,
    source: "Waste",
    scope: "Scope 3",
    category: "Waste treatment",
    emissions: 1150,
    status: "Estimated",
  },
  {
    year: 2025,
    source: "Purchased Goods",
    scope: "Scope 3",
    category: "Purchased goods & services",
    emissions: 2820,
    status: "Estimated",
  },
  {
    year: 2024,
    source: "Electricity",
    scope: "Scope 2",
    category: "Purchased electricity",
    emissions: 8240,
    status: "Available",
  },
  {
    year: 2024,
    source: "Stationary Fuel",
    scope: "Scope 1",
    category: "Fuel combustion",
    emissions: 4310,
    status: "Available",
  },
  {
    year: 2024,
    source: "Transportation",
    scope: "Scope 3",
    category: "Business travel",
    emissions: 2550,
    status: "Estimated",
  },
  {
    year: 2023,
    source: "Electricity",
    scope: "Scope 2",
    category: "Purchased electricity",
    emissions: 8610,
    status: "Available",
  },
  {
    year: 2023,
    source: "Stationary Fuel",
    scope: "Scope 1",
    category: "Fuel combustion",
    emissions: 4480,
    status: "Available",
  },
];