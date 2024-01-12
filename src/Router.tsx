import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Coins from './routes/Coins';
import Coin from './routes/Coin';
import Chart from './routes/Chart';
import Price from './routes/Price';

interface IRouterProps{
  toggleDark:()=> void;
  isDark:boolean;
}



function App({toggleDark,isDark}:IRouterProps) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Coins toggleDark={toggleDark} />} />
        <Route path="/:coinID/*" element={<Coin isDark={isDark}/>} />
      </Routes>
    </Router>
  );
}

export default App;