import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Overview from "./pages/Overview";
import Progress from "./pages/Progress";
import Zero2050 from "./pages/Zero2050";
import NetZero from "./pages/NetZero";
import Inventory from "./pages/Inventory";
import Commitments from "./pages/Commitments";
import DataMethodology from "./pages/DataMethodology";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/zero-2050" element={<Zero2050 />} />
        <Route path="/net-zero" element={<NetZero />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/commitments" element={<Commitments />} />
        <Route path="/data" element={<DataMethodology />} />
      </Routes>

      <footer>
        <div className="content footer-inner">
          <div>
            <strong>IIT Kharagpur Sustainability</strong>
            <p>Campus Carbon Dashboard · Prototype</p>
          </div>

          <span>Built for campus sustainability research</span>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;