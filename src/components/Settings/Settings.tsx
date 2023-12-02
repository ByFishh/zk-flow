import DeleteIcon from '../../icons/DeleteIcon/DeleteIcon';
import EditIcon from '../../icons/EditIcon/EditIcon';
import Gear from '../../icons/Gear/Gear';
import { useSettings } from './Settings.logic';
import './Settings.css';

const Settings = (props: { id: string }) => {
  const logic = useSettings(props);
  return (
    <div className="settings-container" ref={logic.dropDownContainer}>
      <button className="settings-button" onClick={logic.toggleIsActive}>
        <Gear />
      </button>
      <div className="settings-dropdown">
        <div className="settings-dropdown-items-container" data-show={logic.isActive}>
          <button className="settings-dropdown-item" onClick={logic.openEditDialog}>
            <EditIcon />
            <p>Edit</p>
          </button>
          <button className="settings-dropdown-item settings-dropdown-item-delete" onClick={logic.openDeleteDialog}>
            <DeleteIcon />
            <p>Delete</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
