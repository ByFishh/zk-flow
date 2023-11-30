import DialogBanner from '../DialogBanner/DialogBanner';
import Input from '../Input/Input';
import { useWalletDialog } from './WalletDialog.logic';
import './WalletDialog.css';
import { v4 as uuidv4 } from 'uuid';

const inputs: {
  label: string;
  id: 'name' | 'adress' | 'blockchain';
  isDropdown?: {
    multiple: boolean;
    inverted: boolean;
  };
}[] = [
  {
    label: 'Name',
    id: 'name',
  },
  {
    label: 'Adress',
    id: 'adress',
  },
  {
    label: 'Blockchain',
    id: 'blockchain',
    isDropdown: {
      multiple: true,
      inverted: true,
    },
  },
];

const WalletDialog = () => {
  const logic = useWalletDialog();

  return (
    <div className="walletDialog-container">
      <DialogBanner icon={logic.getDialogIcon()} title={logic.getDialogTitleName()} />
      <form onSubmit={logic.handleSubmit(logic.onSubmit)}>
        <div className="walletDialog-content">
          {inputs.map((item) => (
            <Input
              key={uuidv4()}
              label={item.label}
              id={item.id}
              isDropDown={item.isDropdown}
              setValue={logic.setValue}
              register={logic.register}
              initialDropdownValues={logic.initialDropdownValues}
              errors={logic.errors}
            />
          ))}
        </div>
        <div className="walletDialog-footer">
          <button onClick={logic.handleClose}>Close</button>
          <button data-cta={true} type="submit">
            Validate
          </button>
        </div>
      </form>
    </div>
  );
};

export default WalletDialog;
