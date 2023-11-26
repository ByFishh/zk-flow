import './NewWallet.css';
import { useNewWallet } from './NewWallet.logic';
import { memo } from 'react';

const NewWallet = memo(() => {
  const logic = useNewWallet();
  return (
    <button className="newWallet-container" onClick={logic.openAddDialog}>
      Add a new Wallet
    </button>
  );
});

export default NewWallet;
