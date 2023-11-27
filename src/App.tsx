import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import Wallet from './views/Wallet/Wallet';
import Overview from './views/Overview/Overview';
import { useEffect } from 'react';
import { getWallet } from './blockchains';
import { BlockchainType } from './blockchains/types.ts';
import Navbar from './components/Navbar/Navbar.tsx';
import Dialogs from './components/Dialogs/Dialogs.tsx';

function App() {
  useEffect(() => {
    const tmp = async () => {
      const wallet = await getWallet('0x4d7dD30059ff10330001816c2aFD29554B215B48', BlockchainType.zkSync);
      // replace with your address and blockchain
      console.log(wallet);
    };
    tmp();
  }, []);

  return (
    <Router>
      {<Navbar />}
      <Dialogs />
      <div className="app-container">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Wallet />} path="/wallet/:id" />
          <Route element={<Overview />} path="/overview" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
