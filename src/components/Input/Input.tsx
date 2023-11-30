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
  errors: { input: string; message: string } | undefined;
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
        <div className="input-input-container">
          <input className="input-inp" type="text" id={props.id} {...props.register(props.id)} />
          {props.errors && props.errors.input === props.id && (
            <p className="input-error-message" role="alert">
              {props.errors.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
