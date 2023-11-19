import "./GridInfo.css";

const GridInfo = (props: { items: { key: string; value: string }[] }) => {
  return (
    <div className="gridInfo-container">
      <div className="gridInfo-middle-bar"></div>

      {props.items.map((item) => (
        <div className="gridInfo-item-container">
          <p>
            <strong>{item.key}</strong>
          </p>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default GridInfo;
