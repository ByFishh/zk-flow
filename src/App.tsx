import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import AddressPage from './pages/AddressPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ChangelogPage from './pages/ChangelogPage.tsx';

const App = () => {
  return (
    <main className="absolute top-0 left-0 w-full min-h-full bg-gray-100 dark:bg-gray-900">
      <BrowserRouter>
        <Routes>
          <Route index path="/zk-flow/" element={<HomePage />} />
          <Route index path="/zk-flow/about" element={<AboutPage />} />
          <Route index path="/zk-flow/changelog" element={<ChangelogPage />} />
          <Route path="/zk-flow/*" element={<AddressPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
