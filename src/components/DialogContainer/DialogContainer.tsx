import "./DialogContainer.css";

const DialogContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="dialogContainer-container">
      <div className="dialogContainer-shadow"></div>
      <div className="dialogContainer-card">{children}</div>
    </div>
  );
};

export default DialogContainer;
