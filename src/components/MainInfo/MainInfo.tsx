import { memo } from "react";
import { isProfit } from "../../utils/isProfit";
import "./MainInfo.css";

const MainInfo = memo((props: { title: string; lastDay: number; value: string | number; profit: string | number }) => {
  return (
    <div className="mainInfo-container">
      <div className="badge-container" data-is-profit={isProfit(String(props.profit))}>
        <p>{props.profit}</p>
      </div>
      <div className="mainInfo-left-container">
        <p>{props.title}</p>
        <span>The last {props.lastDay} days</span>
      </div>
      <div className="mainInfo-right-container">
        <p>{props.value}</p>
      </div>
    </div>
  );
});

export default MainInfo;
