import { useDispatch, useSelector } from 'react-redux';
import { IAppDispatch, IRootState } from '../../redux/store';
import { setDialog } from '../../redux/reducer/dialogReducer';
import { useCallback } from 'react';

export const useUnknownUrlDialog = () => {
  const dispatch = useDispatch<IAppDispatch>();
  const dialog = useSelector((s: IRootState) => s.dialog);

  const handleSubmit = useCallback(() => {
    if (!dialog.data || !dialog.data.url) return;
    window.open(dialog.data.url, '_blank');
    handleClose();
  }, []);

  const handleClose = useCallback(() => {
    dispatch(setDialog({ isOpen: undefined, data: undefined }));
  }, []);

  return { handleSubmit, handleClose };
};
