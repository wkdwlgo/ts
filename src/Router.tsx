import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Coins from './routes/Coins';
import Coin from './routes/Coin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinID" element={<Coin />} />
      </Routes>
    </Router>
  );
}

export default App;
