import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home/Home';
import Converter from './pages/Converter/Converter';
import SubnetCalc from './pages/SubnetCalc/SubnetCalc';
import VLSM from './pages/VLSM/VLSM';

function App() {
  return (
    <Router>
      {/* Шапка теперь вне Routes */}
      <Header />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/converter" element={<Converter />} />
          <Route path="/subnet-calc" element={<SubnetCalc />} />
          <Route path="/vlsm" element={<VLSM />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;