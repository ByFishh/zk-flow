import NewWallet from '../../components/NewWallet/NewWallet';
import Search from '../../components/Search/Search';
import Title from '../../components/Title/Title';
import WalletDropDown from '../../components/WalletDropDown/WalletDropDown';
import { useHome } from './Home.logic';
import { useMemo } from 'react';
import './Home.css';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  const logic = useHome();

  const renderHeader = useMemo(
    () => (
      <section className="home-header-container">
        <h1>
          Welcome to <span>ZKFlow</span>
        </h1>
        <p>
          zkFlow is a website where you can <strong>track your address</strong> and see how many volume you did on{' '}
          <strong>different blockchains protocols</strong>.
        </p>
      </section>
    ),
    [],
  );

  return (
    <>
      <main className="home-container">
        {renderHeader}
        <section className="home-search-container">
          <Search action={logic.handleSearch} placeholder={'Search an Address'} />
        </section>
        <section>
          <Title content="My Wallets" />
          <div className="home-wallets-container">
            {logic.wallets.map((w) => (
              <WalletDropDown
                key={w.id}
                settings
                infos={{ title: w.name, id: w.id, adress: w.adress, blockchain: w.blockchain }}
              />
            ))}
            <div className="home-new-wallet-container">
              <NewWallet />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
