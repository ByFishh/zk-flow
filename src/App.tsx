import HomeLayout from './layout/HomeLayout.tsx';
import AddressLayout from './layout/AddressLayout.tsx';

const App = () => {
  return (
    <>
      <main className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#121A2B] to-[#143089]">
        {!window.location.search.includes('?address=') ? <HomeLayout /> : <AddressLayout />}
      </main>
    </>
  );
};

export default App;
