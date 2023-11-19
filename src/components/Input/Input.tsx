import DropDown from "../DropDown/DropDown";
import { useInput } from "./Input.logic";
import { IWallet } from "../../types/Wallet/IWallet";
import { UseFormSetValue } from "react-hook-form";
import "./Input.css";

const Input = (props: {
  id: string;
  label: string;
  isDropDown?: {
    multiple: boolean;
    inverted: boolean;
  };
  setValue: UseFormSetValue<IWallet>;
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
        />
      ) : (
        <input
          className="input-inp"
          type="text"
          onChange={logic.handleInput}
          id={props.id}
        />
      )}
    </div>
  );
};

export default Input;
