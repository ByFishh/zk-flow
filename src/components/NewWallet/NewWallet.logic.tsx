/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux';
import { IAppDispatch } from '../../redux/store';
import { IDialogs } from '../../types/Dialogs/IDialogs';
import { setDialog } from '../../redux/reducer/dialogReducer';
import { IDialogAction } from '../../types/Dialogs/IDialogAction';
import { useCallback } from 'react';

export const useNewWallet = () => {
  const dispatch = useDispatch<IAppDispatch>();

  const openAddDialog = useCallback(() => {
    dispatch(setDialog({ isOpen: IDialogs.WALLET, data: { action: IDialogAction.ADD } }));
  }, []);

  return { openAddDialog };
};
