import DropDown from '../DropDown/DropDown';
import { useInput } from './Input.logic';
import { IWallet } from '../../types/Wallet/IWallet';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import './Input.css';

const Input = (props: {
  id: 'name' | 'adress' | 'blockchain';
  label: string;
  isDropDown?: {
    multiple: boolean;
    inverted: boolean;
  };
  setValue: UseFormSetValue<IWallet>;
  register: UseFormRegister<IWallet>;
  initialDropdownValues: string[];
}) => {
  const logic = useInput(props);

  return (
    <div className="input-container">
      <p className="input-label">{props.label}</p>
      {props.isDropDown ? (
        <DropDown
          multiple={props.isDropDown.multiple}
          inverted={props.isDropDown.inverted}
          onChange={logic.onDropDownChange}
          initialValues={props.initialDropdownValues}
        />
      ) : (
        <input className="input-inp" type="text" id={props.id} {...props.register(props.id)} />
      )}
    </div>
  );
};

export default Input;
