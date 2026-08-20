import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(null);
  };

  const toggleDropdown = (name) => {
    setDropdownOpen(
      dropdownOpen === name ? null : name
    );
  };

  return (
    <header className="navbar">
      <div className="nav-container">

        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark">IIT</span>

          <div>
            <strong>Kharagpur</strong>
            <span>Sustainability</span>
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

          {/* Overview */}
          <NavLink to="/" onClick={closeMenu}>
            Overview
          </NavLink>

          {/* Emissions */}
          <div className="nav-dropdown">
            <button
              className="nav-dropdown-button"
              onClick={() => toggleDropdown("emissions")}
            >
              Emissions
              <span>⌄</span>
            </button>

            <div
              className={`dropdown-menu ${
                dropdownOpen === "emissions"
                  ? "dropdown-open"
                  : ""
              }`}
            >
              <NavLink
                to="/emissions"
                onClick={closeMenu}
              >
                Total Emissions
              </NavLink>

              <NavLink
                to="/scope-3"
                onClick={closeMenu}
              >
                Scope 3
              </NavLink>
            </div>
          </div>

          {/* Campus */}
          <NavLink to="/campus" onClick={closeMenu}>
            Campus
          </NavLink>

          {/* Data */}
          <div className="nav-dropdown">
            <button
              className="nav-dropdown-button"
              onClick={() => toggleDropdown("data")}
            >
              Data
              <span>⌄</span>
            </button>

            <div
              className={`dropdown-menu ${
                dropdownOpen === "data"
                  ? "dropdown-open"
                  : ""
              }`}
            >
              <NavLink
                to="/explorer"
                onClick={closeMenu}
              >
                Data Explorer
              </NavLink>

              <NavLink
                to="/data"
                onClick={closeMenu}
              >
                Methodology
              </NavLink>
            </div>
          </div>

        </nav>

      </div>
    </header>
  );
}

export default Navbar;