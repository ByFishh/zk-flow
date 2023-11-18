import { memo } from "react";
import Cross from "../Cross/Cross";
import "./DialogBanner.css";
import { useDialogBanner } from "./DialogBanner.logic";

const DialogBanner = memo(
  (props: { title: string; icon: JSX.Element; alert?: boolean }) => {
    const logic = useDialogBanner();

    return (
      <div className="dialogBanner-container" data-alert={props.alert}>
        <div className="dialogBanner-left">
          {props.icon}
          <p>{props.title}</p>
        </div>
        <div className="dialogBanner-right">
          <button onClick={logic.handleClose}>
            <Cross />
          </button>
        </div>
      </div>
    );
  }
);

export default DialogBanner;
