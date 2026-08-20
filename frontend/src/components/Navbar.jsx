import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
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
          <NavLink to="/" onClick={closeMenu}>
            Overview
          </NavLink>

          <NavLink to="/progress" onClick={closeMenu}>
            Progress
          </NavLink>

          <NavLink to="/zero-2050" onClick={closeMenu}>
            Zero by 2050
          </NavLink>

          <NavLink to="/net-zero" onClick={closeMenu}>
            Net Zero
          </NavLink>

          <NavLink to="/inventory" onClick={closeMenu}>
            GHG Inventory
          </NavLink>

          <NavLink to="/scope-3" onClick={closeMenu}>
            Scope 3
          </NavLink>

          <NavLink to="/commitments" onClick={closeMenu}>
            Commitments
          </NavLink>

          <NavLink to="/data" onClick={closeMenu}>
            Data & Methodology
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;