import HomePage from './pages/HomePage.tsx';
import AddressPage from './pages/AddressPage.tsx';

const App = () => {
  return (
    <main className="absolute top-0 left-0 w-full min-h-full bg-gray-100 dark:bg-gray-900">
      {!window.location.search.includes('?address=') ? <HomePage /> : <AddressPage />}
    </main>
  );
};

export default App;
