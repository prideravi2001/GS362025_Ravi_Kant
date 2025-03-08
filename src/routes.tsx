// import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import Home from './pages/Home';
import Stores from './pages/Stores';
import SKUs from './pages/SKUs';
import Planning from './pages/Planning';
import Chart from './pages/Chart';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stores" element={<Stores />} />
      <Route path="/skus" element={<SKUs />} />
      <Route path="/planning" element={<Planning />} />
      <Route path="/chart" element={<Chart />} />
    </Routes>
  </Router>
);
export default AppRoutes;
