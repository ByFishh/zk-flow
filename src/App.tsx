import Navbar from './components/Navbar.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import AddressPage from './pages/AddressPage.tsx';

const App = () => {
  return (
    <main className="absolute top-0 left-0 w-full min-h-full bg-gradient-to-t from-[#121A2B] to-[#143089]">
      <BrowserRouter>
        <Routes>
          <Route index path="/zk-flow/" element={<HomePage />} />
          <Route path="/zk-flow/*" element={<AddressPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
