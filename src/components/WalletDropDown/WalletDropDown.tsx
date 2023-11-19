import { useMemo } from "react";
import Chevron from "../Chevron/Chevron";
import "./WalletDropDown.css";
import Settings from "../Settings/Settings";
import { useWalletDropDown } from "./WalletDropDown.logic";
import { cutWalletAdress } from "../../utils/cutWalletAdress";

const WalletDropDown = (props: { details?: boolean; settings?: boolean }) => {
  const logic = useWalletDropDown();

  const renderWalletTitle = useMemo(
    () => (
      <div className="walletDropDown-main-info">
        <p className="walletDropDown-name">Wallet Name</p>
        <span>{cutWalletAdress("test")}</span>
        <div className="walletDropDown-blockchain-container">
          {/* // Blockchains Logos */}
          <div className="fake-logo"></div>
          <div className="fake-logo"></div>
          <div className="fake-logo"></div>
        </div>
      </div>
    ),
    []
  );

  return (
    <div className="walletDropDown-container">
      <div className="walletDropDown-top">
        {renderWalletTitle}
        <div className="walletDropDown-right-container">
          {props.details && (
            <button className="walletDropDown-details-btn" onClick={logic.toggleIsActive}>
              <p>More details</p>
              <Chevron isActive={logic.isActive} />
            </button>
          )}
          {props.settings && <Settings />}
        </div>
      </div>
    </div>
  );
};

export default WalletDropDown;
