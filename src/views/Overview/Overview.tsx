import MainInfo from '../../components/MainInfo/MainInfo';
import Search from '../../components/Search/Search';
import Title from '../../components/Title/Title';
import WalletDropDown from '../../components/WalletDropDown/WalletDropDown';
import { useOverview } from './Overview.logic';
import './Overview.css';
import Loader from '../../components/Loader/Loader';
import NoWallet from '../../components/NoWallet/NoWallet';
import Footer from '../../components/Footer/Footer';

const Overview = () => {
  const logic = useOverview();

  if (logic.isLoading)
    return <Loader message="Loading wallets. This operation may take some time. Please wait" fullSize />;
  if (logic.getFilteredWallets().length === 0)
    return (
      <NoWallet
        message={`No ${logic.currentBlockchain} wallet found. Please add one or make sure your registered wallets contain valid addresses.`}
      />
    );

  return (
    <>
      <div className="overview-container">
        <h2 className="overview-title">Wallet Overviews</h2>
        <section>
          <Title content="Global Informations" />
          <div className="overview-main-info-container">
            <MainInfo
              title="Interactions"
              lastDay={7}
              profit={logic.sumTotals('interaction', 'change')}
              value={logic.sumTotals('interaction', 'total')}
            />
            <MainInfo
              title="Volume"
              lastDay={7}
              profit={logic.sumTotals('volume', 'change')}
              value={logic.sumTotals('volume', 'total')}
            />
            <MainInfo
              title="Fee spent"
              lastDay={7}
              profit={logic.sumTotals('fee', 'change')}
              value={logic.sumTotals('fee', 'total')}
            />
            <MainInfo
              title="Interacted Contracts"
              lastDay={7}
              profit={logic.sumTotals('contract', 'change')}
              value={logic.sumTotals('contract', 'total')}
            />
          </div>
        </section>
        <section className="overview-wallet-section">
          <div className="overview-wallet-title-section">
            <Title content="Wallets" />
            <p>
              Loaded wallets: {logic.wallets.length}/{logic.getFilteredWallets().length}
            </p>
          </div>
          <div className="overview-search-container">
            <Search action={logic.handleSearch} placeholder="Search a wallet" />
          </div>
          <div className="overview-wallets-container">
            {logic
              .getFilteredWallets()
              .filter((val) =>
                logic.keyword === undefined ? val : val.name.toLowerCase().includes(logic.keyword.toLowerCase()) && val,
              )
              .map((w) => (
                <WalletDropDown
                  key={w.id}
                  details
                  settings
                  infos={{
                    title: w.name,
                    id: w.id,
                    adress: w.adress,
                    blockchain: w.blockchain,
                    gridInfo: logic.getGridInfos(w.adress),
                  }}
                />
              ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Overview;
