import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CarbonProvider } from "./context/CarbonContext";

import Overview from "./pages/Overview";
import Inventory from "./pages/Inventory";
import Scope3 from "./pages/Scope3";
import Commitments from "./pages/Commitments";
import DataMethodology from "./pages/DataMethodology";
import DataExplorer from "./pages/DataExplorer";

function App() {
  return (
    <CarbonProvider>
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Overview />} />

        <Route path="/emissions" element={<Inventory />} />
        <Route path="/scope-3" element={<Scope3 />} />

        <Route path="/campus" element={<Commitments />} />

        <Route path="/explorer" element={<DataExplorer />} />
        <Route path="/data" element={<DataMethodology />} />
      </Routes>

      <Footer />
    </BrowserRouter>
    </CarbonProvider>
  );
}

export default App;