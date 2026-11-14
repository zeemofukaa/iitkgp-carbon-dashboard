import { Link } from "react-router-dom";

import { SCOPE_COLORS } from "../theme";

const LINKS = [
  ["Overview", "/"],
  ["Total emissions", "/emissions"],
  ["Scope 3", "/scope-3"],
  ["Campus hotspots", "/campus"],
  ["Data explorer", "/explorer"],
  ["Methodology", "/data"],
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="sf-scopebar" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span key={n} style={{ background: SCOPE_COLORS[n] }} />
        ))}
      </div>

      <div className="content sf-grid">
        <div className="sf-about">
          <strong>Campus Carbon Intelligence</strong>
          <p>
            Sorts a campus's emissions into Scope 1, 2 and 3 and shows how each
            number is calculated.
          </p>
          <p className="sf-small">IIT Kharagpur B.Tech project (prototype)</p>
        </div>

        <nav className="sf-links" aria-label="Footer">
          <span className="sf-head">Explore</span>
          {LINKS.map(([label, to]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="sf-data">
          <span className="sf-head">About the data</span>
          <p>
            Every figure comes from the IIT Delhi 2025 GHG inventory, used as a
            reference dataset.
          </p>
          <p className="sf-small">
            Method: activity data × emission factor = tCO₂e, following the GHG
            Protocol.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
