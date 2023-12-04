import MainInfo from '../../components/MainInfo/MainInfo';
import Title from '../../components/Title/Title';
import './Wallet.css';
import AD from '../../ad/ad1.png';
import GridInfo from '../../components/GridInfo/GridInfo';
import AirdropItem from '../../components/AirdropItem/AirdropItem';
import Protocols from '../../components/Protocols/Protocols';
import WalletDropDown from '../../components/WalletDropDown/WalletDropDown';
import { v4 as uuidv4 } from 'uuid';
import { useWallet } from './Wallet.logic';
import { isProfit } from '../../utils/isProfit';
import Loader from '../../components/Loader/Loader';
import NoWallet from '../../components/NoWallet/NoWallet';
import Footer from '../../components/Footer/Footer';

const Wallet = () => {
  const logic = useWallet();
  if (logic.isLoading) return <Loader message="Loading the wallet. Please wait" fullSize />;
  if (!logic.wallet.address)
    return (
      <NoWallet
        message={`We are sorry. No wallet with this corresponding address was found. Please make sure that the address is valid`}
      />
    );

  return (
    <>
      <div className="wallet-container">
        <h2 className="wallet-title">Wallet Information</h2>
        <p className="wallet-subtitle">{logic.wallet.address}</p>
        <section>
          <div className="wallet-main-info-container">
            <MainInfo
              title="Interactions"
              lastDay={7}
              profit={logic.wallet.interaction.change}
              value={logic.wallet.interaction.total}
            />
            <MainInfo
              title="Volume"
              lastDay={7}
              profit={logic.wallet.volume.change}
              value={logic.wallet.volume.total}
            />
            <MainInfo title="Fee spent" lastDay={7} profit={logic.wallet.fee.change} value={logic.wallet.fee.total} />
            <MainInfo
              title="Contract"
              lastDay={7}
              profit={logic.wallet.contract.change}
              value={logic.wallet.contract.total}
            />
          </div>
        </section>
        <section className="wallet-balance-section">
          <WalletDropDown
            details
            infos={{
              title: 'Balance',
              id: uuidv4(),
              gridInfo: logic.wallet.tokens.map((item) => ({ key: item.symbol, value: item.balance })),
            }}
          />
        </section>
        <section className="wallet-ad-container">
          <img src={AD} onClick={logic.handleADClick} />
        </section>
        <section className="wallet-blockchain-section">
          <GridInfo items={logic.wallet.additionalInfos.map((item) => ({ key: item.label, value: item.value }))} />
        </section>
        <section className="wallet-aidrop-container">
          <div>
            <Title content="Airdrop eligibility Simulator" />
            <p className="wallet-airdrop-desc">
              <strong>A minimum of 3 points total</strong> are required <strong>to be eligible</strong>. If you score
              less than 3 points, all criteria will be crossed out.
            </p>
            <div className="wallet-airdrop-left-flex">
              <p className="wallet-airdrop-tasks">
                Completed Tasks {logic.wallet.airdrop.checked}/{logic.wallet.airdrop.total}
              </p>
              <p className="wallet-aidrop-eligible" data-is-eligible={isProfit(logic.wallet.airdrop.value)}>
                Eligible for {logic.wallet.airdrop.value}
              </p>
            </div>
          </div>
          <div>
            {logic.wallet.airdrop.items.map((item) => (
              <AirdropItem
                key={uuidv4()}
                title={item.title}
                items={item.items.map((v) => ({ txt: v.label, checked: v.checked }))}
              />
            ))}
          </div>
        </section>
        <section className="wallet-protocols-container">
          <Title content="Protocols" />
          <Protocols items={logic.wallet.protocols} />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Wallet;
