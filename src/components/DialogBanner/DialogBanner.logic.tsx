import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { IAppDispatch } from "../../redux/store";
import { setDialog } from "../../redux/reducer/dialogReducer";

export const useDialogBanner = () => {
  const dispatch = useDispatch<IAppDispatch>();

  const handleClose = useCallback(() => {
    dispatch(setDialog({ isOpen: undefined, data: undefined }));
  }, []);
  return { handleClose };
};
