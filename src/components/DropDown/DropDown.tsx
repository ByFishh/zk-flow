import { useDropDown } from './DropDown.logic';
import { v4 as uuidv4 } from 'uuid';
import './DropDown.css';
import Cross from '../../icons/Cross/Cross';
import Chevron from '../../icons/Chevron/Chevron';
import { memo } from 'react';
import { preventBigString } from '../../utils/preventBigString';

const DropDown = memo(
  (props: { multiple: boolean; inverted?: boolean; onChange?: (data: string[]) => void; initialValues?: string[] }) => {
    const logic = useDropDown(props);

    return (
      <div className="dropDown-container" ref={logic.dropDownContainer}>
        {props.multiple && (
          <div className="dropDown-selected-items-container">
            {logic.items
              .filter((item) => item.isChecked)
              .map((item) => (
                <div className="dropDown-selected-item" key={uuidv4()}>
                  <p>{item.name}</p>
                  <button onClick={() => logic.handleDropDown(item.name)}>
                    <Cross />
                  </button>
                </div>
              ))}
          </div>
        )}
        <div className="dropDown-input" data-is-inverted={props.inverted}>
          <Chevron isActive={logic.isActive} />
          <div className="dropDown-trigger-active" onClick={() => logic.toggleIsActive()}></div>
          <p className="dropDown-placeholer">
            {props.multiple || !logic.getSelectedItem() ? 'Select Blockchain' : logic.getSelectedItem()}
          </p>
          <div className="dropDown-items-container" data-show={logic.isActive}>
            {logic.items.map((item) => (
              <div
                className="dropDown-item"
                key={uuidv4()}
                onClick={() => logic.handleDropDown(item.name)}
                data-checked={item.isChecked}
              >
                <p>{preventBigString(item.name, 14)}</p>
                {props.multiple && <input type="checkbox" defaultChecked={item.isChecked} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

export default DropDown;
