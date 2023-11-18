import { useDispatch } from "react-redux";
import { IAppDispatch } from "../../redux/store";
import { setDialog } from "../../redux/reducer/dialogReducer";
import { useCallback } from "react";

export const useDeleteDialog = () => {
  const dispatch = useDispatch<IAppDispatch>();

  const handleSubmit = () => {
    // Delete action
  };

  const handleClose = useCallback(() => {
    dispatch(setDialog({ isOpen: undefined, data: undefined }));
  }, []);

  return { handleSubmit, handleClose };
};
