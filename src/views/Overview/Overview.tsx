import MainInfo from '../../components/MainInfo/MainInfo';
import Search from '../../components/Search/Search';
import Title from '../../components/Title/Title';
import WalletDropDown from '../../components/WalletDropDown/WalletDropDown';
import { useOverview } from './Overview.logic';
import './Overview.css';

const Overview = () => {
  const logic = useOverview();
  return (
    <div className="overview-container">
      <h2 className="overview-title">Wallet Overviews</h2>
      <section>
        <Title content="Global Informations" />
        <div className="overview-main-info-container">
          <MainInfo title="Title" lastDay={2} profit={'34'} value={40} />
          <MainInfo title="Title" lastDay={2} profit={'34'} value={40} />
          <MainInfo title="Title" lastDay={2} profit={'34'} value={40} />
          <MainInfo title="Title" lastDay={2} profit={'34'} value={40} />
        </div>
      </section>
      <section className="overview-wallet-section">
        <Title content="Wallets" />
        <div className="overview-search-container">
          <Search action={logic.handleSearch} placeholder="Search a wallet" />
        </div>
        <div className="overview-wallets-container">
          {logic.wallets
            .filter((val) =>
              logic.keyword === undefined ? val : val.name.toLowerCase().includes(logic.keyword.toLowerCase()) && val,
            )
            .map((w) => (
              <WalletDropDown
                key={w.id}
                details
                settings
                infos={{ title: w.name, id: w.id, adress: w.adress, blockchain: w.blockchain }}
              />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Overview;
