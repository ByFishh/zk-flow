import DeleteIcon from "../DeleteIcon/DeleteIcon";
import DialogBanner from "../DialogBanner/DialogBanner";
import "./DeleteDialog.css";
import { useDeleteDialog } from "./DeleteDialog.logic";

const DeleteDialog = () => {
  const logic = useDeleteDialog();
  return (
    <div className="deleteDialog-container">
      <DialogBanner icon={<DeleteIcon />} title="Delete" alert />
      <div className="deleteDialog-content">
        <p>
          Are you sure you want to <strong>delete this Wallet?</strong> It will
          be <strong>permanently deleted</strong> from your list
        </p>
      </div>
      <div className="deleteDialog-footer">
        <button onClick={logic.handleClose}>Close</button>
        <button onClick={logic.handleSubmit} data-cta={true}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteDialog;
