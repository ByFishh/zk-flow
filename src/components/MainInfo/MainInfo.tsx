import { memo } from 'react';
import { isProfit } from '../../utils/isProfit';
import './MainInfo.css';
import { toFixed } from '../../utils/toFixed';

const MainInfo = memo((props: { title: string; lastDay: number; value: number; profit: number }) => {
  return (
    <div className="mainInfo-container">
      <div className="badge-container" data-is-profit={isProfit(props.profit)}>
        <p>+{toFixed(props.profit, 2)}</p>
      </div>
      <div className="mainInfo-left-container">
        <p>{props.title}</p>
        <span>The last {props.lastDay} days</span>
      </div>
      <div className="mainInfo-right-container">
        <p>{toFixed(props.value, 2)}</p>
      </div>
    </div>
  );
});

export default MainInfo;
