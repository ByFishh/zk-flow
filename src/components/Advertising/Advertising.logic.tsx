import { useDispatch, useSelector } from 'react-redux';
import { IAppDispatch, IRootState } from '../../redux/store';
import { useState } from 'react';
import { setDialog } from '../../redux/reducer/dialogReducer';
import { IDialogs } from '../../types/Dialogs/IDialogs';
import './Advertising.css';

export const useAdvertising = () => {
  const { currentBlockchain } = useSelector((s: IRootState) => s.blockchain);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const dispatchCtx = useDispatch<IAppDispatch>();

  const onImageLoaded = () => setIsLoaded(true);
  const onError = () => setIsLoaded(false);

  const handleADClick = () => {
    const url = 'https://www.universalchains.io/';
    dispatchCtx(setDialog({ isOpen: IDialogs.UNKNOWN_URL, data: { url } }));
  };

  return { isLoaded, currentBlockchain, onError, onImageLoaded, handleADClick };
};
