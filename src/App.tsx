import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import Wallet from './views/Wallet/Wallet';
import Overview from './views/Overview/Overview';
import Navbar from './components/Navbar/Navbar.tsx';
import Dialogs from './components/Dialogs/Dialogs.tsx';

function App() {
  return (
    <Router>
      {<Navbar />}
      <Dialogs />
      <div className="app-container">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Wallet />} path="/wallet/:id/:blockchain" />
          <Route element={<Overview />} path="/overview" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
