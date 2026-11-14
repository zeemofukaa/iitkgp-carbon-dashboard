import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import { useCarbon } from "../context/CarbonContext";
import { SCOPE_COLORS } from "../theme";

const MENUS = {
  emissions: {
    label: "Emissions",
    items: [
      ["/emissions", "Total emissions", "Scope 1 and 2, step by step"],
      ["/scope-3", "Scope 3", "15 categories, how each was measured"],
    ],
  },
  data: {
    label: "Data",
    items: [
      ["/explorer", "Data explorer", "Every line item, filterable"],
      ["/data", "Methodology", "Sources, checks and limits"],
    ],
  },
};

function Chevron() {
  return (
    <svg className="chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const { charts, error } = useCarbon();

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(null);
  };

  const toggleDropdown = (name) => {
    setDropdownOpen(dropdownOpen === name ? null : name);
  };

  const status = charts ? "live" : error ? "offline" : "loading";

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" strokeLinecap="round">
              <g transform="translate(1.1 0)">
                <path d="M15.28 14.29A4 4 0 1 1 15.28 9.71" stroke="#fff" strokeWidth="1.8" />
                <path d="M18.14 16.3A7.5 7.5 0 1 1 18.14 7.7" stroke="#fff" strokeWidth="1.8" strokeOpacity="0.7" />
                <path d="M21.01 18.31A11 11 0 1 1 21.01 5.69" stroke="#fff" strokeWidth="1.8" strokeOpacity="0.4" strokeDasharray="3.2 2.6" />
                <circle cx="12" cy="12" r="1.7" fill="#e5384f" />
              </g>
            </svg>
          </span>

          <div>
            <strong>Campus Carbon Intelligence</strong>
            <span>IIT Kharagpur</span>
          </div>
        </Link>

        <button
          className={`menu-button ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "nav-open" : ""}>
          <NavLink to="/" end onClick={closeMenu}>
            Overview
          </NavLink>

          {Object.entries(MENUS).map(([key, menu]) => (
            <div className="nav-dropdown" key={key}>
              <button
                className="nav-dropdown-button"
                onClick={() => toggleDropdown(key)}
                aria-expanded={dropdownOpen === key}
              >
                {menu.label}
                <Chevron />
              </button>

              <div className={`dropdown-menu ${dropdownOpen === key ? "dropdown-open" : ""}`}>
                {menu.items.map(([to, title, sub]) => (
                  <NavLink key={to} to={to} onClick={closeMenu}>
                    <b>{title}</b>
                    <small>{sub}</small>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}

          <NavLink to="/campus" onClick={closeMenu}>
            Campus
          </NavLink>

          <span className={`nav-status ${status}`} title="Connection to the carbon API">
            <i />
            {status === "live" ? "Live data" : status === "offline" ? "API offline" : "Connecting"}
          </span>
        </nav>
      </div>

      <div className="nav-scopebar" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span key={n} style={{ background: SCOPE_COLORS[n] }} />
        ))}
      </div>
    </header>
  );
}

export default Navbar;
