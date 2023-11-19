import DeleteIcon from "../DeleteIcon/DeleteIcon";
import EditIcon from "../EditIcon/EditIcon";
import Gear from "../Gear/Gear";
import { useSettings } from "./Settings.logic";
import "./Settings.css";

const Settings = () => {
  const logic = useSettings();
  return (
    <div className="settings-container">
      <button className="settings-button" onClick={logic.toggleIsActive}>
        <Gear />
      </button>
      <div className="settings-dropdown">
        <div
          className="settings-dropdown-items-container"
          data-show={logic.isActive}
        >
          <div
            className="settings-dropdown-item"
            onClick={logic.openEditDialog}
          >
            <EditIcon />
            <p>Edit</p>
          </div>
          <div
            className="settings-dropdown-item settings-dropdown-item-delete"
            onClick={logic.openDeleteDialog}
          >
            <DeleteIcon />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
