import Chevron from '../../icons/Chevron/Chevron';
import './AirdropItem.css';
import { useAirdropItem } from './AirdropItem.logic';
import { v4 as uuidv4 } from 'uuid';

const AirdropItem = (props: { title: string; items: { txt: string; checked: boolean }[] }) => {
  const logic = useAirdropItem(props);

  return (
    <div className="airdropItem-container">
      <div className="airdropItem-top-container" onClick={logic.toggleIsActive}>
        <div className="airdropItem-flex" data-is-checked={true}>
          <div className="airdropItem-check" style={{ background: logic.getStateColor() }}></div>
          <p>{props.title}</p>
        </div>
        <div className="airdropItem-flex">
          <Chevron isActive={logic.isActive} />
        </div>
      </div>
      {logic.isActive && (
        <div className="airdropItem-items-container">
          {props.items.map((item) => (
            <div key={uuidv4()} className="airdropItem-item" data-is-checked={item.checked}>
              <div className="airdropItem-check"></div>
              <p>{item.txt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AirdropItem;
