import { IGridInfo } from '../../types/Wallet/IGridInfo';
import { isNumber } from '../../utils/isNumber';
import { toFixed } from '../../utils/toFixed';
import { v4 as uuidv4 } from 'uuid';
import './GridInfo.css';
import Loader from '../Loader/Loader';

const GridInfo = (props: { items: IGridInfo[] }) => {
  if (!props.items.length)
    return (
      <div className="gridInfo-container" style={{ padding: '2rem 0' }}>
        <Loader />
      </div>
    );

  return (
    <div className="gridInfo-container">
      <div className="gridInfo-middle-bar"></div>

      {props.items.map((item) => (
        <div key={uuidv4()} className="gridInfo-item-container">
          <p>
            <strong>{item.key}</strong>
          </p>
          <p>{isNumber(item.value) ? toFixed(item.value as number, 3) : item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default GridInfo;
