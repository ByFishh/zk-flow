import { useDispatch, useSelector } from 'react-redux';
import { IAppDispatch, IRootState } from '../../redux/store';
import { setDialog } from '../../redux/reducer/dialogReducer';
import { useCallback } from 'react';
import { useLocalStorage } from '../../hook/useLocalStorage';

export const useDeleteDialog = () => {
  const dispatch = useDispatch<IAppDispatch>();
  const dialog = useSelector((s: IRootState) => s.dialog);
  const { deleteItemLocalStorage } = useLocalStorage();

  const handleSubmit = useCallback(() => {
    // Delete action
    if (!dialog.data || !dialog.data.id) return;
    deleteItemLocalStorage(dialog.data.id);
    handleClose();
  }, []);

  const handleClose = useCallback(() => {
    dispatch(setDialog({ isOpen: undefined, data: undefined }));
  }, []);

  return { handleSubmit, handleClose };
};
