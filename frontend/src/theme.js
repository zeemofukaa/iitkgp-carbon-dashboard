// One place for the scope colors. Teal, blue and amber were checked with a
// colour-vision validator on both the light panels and the dark hero.
export const SCOPE_COLORS = {
  1: "#0b9a85",
  2: "#2f5fe0",
  3: "#d97706",
};

// Text drawn on top of a scope colour (contrast >= 4.5:1)
export const SCOPE_INK = {
  1: "#0a1614",
  2: "#ffffff",
  3: "#0a1614",
};

export const fmt = (n) => Math.round(n).toLocaleString();
