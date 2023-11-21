/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux';
import { IAppDispatch } from '../../redux/store';
import { useCallback } from 'react';
import { setDialog } from '../../redux/reducer/dialogReducer';
import { useForm } from 'react-hook-form';
import { IWallet } from '../../types/Wallet/IWallet';

export const useWalletDialog = () => {
  const dispatch = useDispatch<IAppDispatch>();
  const { handleSubmit, setValue } = useForm<IWallet>();

  const onSubmit = (data: IWallet) => {
    // Edit/Add action
    data;
  };

  const handleClose = useCallback(() => {
    dispatch(setDialog({ isOpen: undefined, data: undefined }));
  }, []);

  return { handleSubmit, onSubmit, handleClose, setValue };
};
