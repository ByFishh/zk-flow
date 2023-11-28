import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import Wallet from './views/Wallet/Wallet';
import Overview from './views/Overview/Overview';
import { useEffect } from 'react';
import { getWallet } from './blockchains';
import { Blockchain } from './blockchains/types.ts';
import Navbar from './components/Navbar/Navbar.tsx';
import Dialogs from './components/Dialogs/Dialogs.tsx';

function App() {
  useEffect(() => {
    const tmp = async () => {
      const zksync = await getWallet('0xf859de92a63070c54d05e33a4e99d707a34fdb12', Blockchain.zkSync);
      const scroll = await getWallet('0x762702C9CF2eE4d7682d8612924F02cD75183745', Blockchain.scroll);
      //const base = await getWallet('0xf859de92a63070c54d05e33a4e99d707a34fdb12', BlockchainType.base);
      // replace with your address and blockchain
      console.log('zkSync', zksync);
      console.log('scroll', scroll);
      //console.log('base', base);
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
