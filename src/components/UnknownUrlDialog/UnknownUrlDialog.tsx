import DialogBanner from '../DialogBanner/DialogBanner';
import './UnknownUrlDialog.css';
import Information from '../../icons/Information/Information';
import { useUnknownUrlDialog } from './UnknownUrlDialog.logic.';

const UnknownUrlDialog = () => {
  const logic = useUnknownUrlDialog();
  return (
    <div className="unknownUrlDialog-container">
      <DialogBanner icon={<Information />} title="Pay attention" alert />
      <div className="unknownUrlDialog-content">
        <p>
          Please conduct your own research and exercise due diligence before utilizing the services advertised on
          zkFlow. ZkFlow is not responsible in case of scam or lost of money"
        </p>
      </div>
      <div className="unknownUrlDialog-footer">
        <button onClick={logic.handleClose}>Cancel</button>
        <button onClick={logic.handleSubmit}>Continue</button>
      </div>
    </div>
  );
};

export default UnknownUrlDialog;
