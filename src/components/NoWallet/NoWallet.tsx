import Information from '../../icons/Information/Information';
import './NoWallet.css';
import { useNoWallet } from './NoWallet.logic';

const NoWallet = (props: { message: string }) => {
  const logic = useNoWallet();
  return (
    <div className="noWallet-container">
      <Information />
      <p>{props.message}</p>
      <button onClick={logic.handleClick}>Go to Home</button>
    </div>
  );
};

export default NoWallet;
