import DialogContainer from "../DialogContainer/DialogContainer";
import { useDialogs } from "./Dialogs.logic";
import { v4 as uuidv4 } from "uuid";

const Dialogs = () => {
  const logic = useDialogs();

  if (!logic.isOpen) return;

  return (
    <DialogContainer>
      <div>
        {logic.dialogs
          .filter((d) => d.show)
          .map((d) => (
            <div key={uuidv4()}>{d.component}</div>
          ))}
      </div>
    </DialogContainer>
  );
};

export default Dialogs;
