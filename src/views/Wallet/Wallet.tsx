import MainInfo from '../../components/MainInfo/MainInfo';
import Title from '../../components/Title/Title';
import './Wallet.css';
import AD from '../../ad/ad1.png';
import GridInfo from '../../components/GridInfo/GridInfo';
import AirdropItem from '../../components/AirdropItem/AirdropItem';
import Protocols from '../../components/Protocols/Protocols';
import WalletDropDown from '../../components/WalletDropDown/WalletDropDown';
import { v4 as uuidv4 } from 'uuid';

const Wallet = () => {
  return (
    <div className="wallet-container">
      <h2 className="wallet-title">Wallet Information</h2>
      <p className="wallet-subtitle">0xfakcia023labmklxa0mxff32</p>
      <section>
        <div className="wallet-main-info-container">
          <MainInfo title="Title" lastDay={2} profit={'34'} value={40} />
          <MainInfo title="Title" lastDay={2} profit={'34'} value={40} />
          <MainInfo title="Title" lastDay={2} profit={'34'} value={40} />
          <MainInfo title="Title" lastDay={2} profit={'34'} value={40} />
        </div>
      </section>
      <section className="wallet-balance-section">
        <WalletDropDown
          details
          infos={{
            title: 'Balance',
            id: uuidv4(),
            gridInfo: [
              { key: 'Information', value: 'value' },
              { key: 'Information', value: 'value' },
              { key: 'Information', value: 'value' },
              { key: 'Information', value: 'value' },
              { key: 'Information', value: 'value' },
              { key: 'Information', value: 'value' },
            ],
          }}
        />
      </section>
      <section className="wallet-ad-container">
        <img src={AD} />
      </section>
      <section className="wallet-blockchain-section">
        <GridInfo
          items={[
            { key: 'Information', value: 'value' },
            { key: 'Information', value: 'value' },
            { key: 'Information', value: 'value' },
            { key: 'Information', value: 'value' },
            { key: 'Information', value: 'value' },
            { key: 'Information', value: 'value' },
          ]}
        />
      </section>
      <section className="wallet-aidrop-container">
        <div>
          <Title content="Airdrop eligibility Simulator" />
          <p className="wallet-airdrop-desc">
            <strong>A minimum of 3 points total</strong> are required <strong>to be eligible</strong>. If you score less
            than 3 points, all criteria will be crossed out.
          </p>
          <div className="wallet-airdrop-left-flex">
            <p className="wallet-airdrop-tasks">Completed Tasks 5/15</p>
            <p className="wallet-aidrop-eligible" data-is-eligible={false}>
              Eligible for 1000$
            </p>
          </div>
        </div>
        <div>
          <AirdropItem
            title="Item number 1"
            items={[
              { txt: 'first item', checked: true },
              { txt: 'second item', checked: false },
            ]}
          />
          <AirdropItem
            title="Item number 2"
            items={[
              { txt: 'first item', checked: true },
              { txt: 'second item', checked: true },
            ]}
          />
        </div>
      </section>
      <section className="wallet-protocols-container">
        <Title content="Protocols" />
        <Protocols
          items={[
            { name: 'SyncSwap', activeDays: 21, interactions: 432, lastActivity: 20, volume: '493' },
            { name: 'SyncSwap', activeDays: 21, interactions: 432, lastActivity: 20, volume: '493' },
          ]}
        />
      </section>
    </div>
  );
};

export default Wallet;
