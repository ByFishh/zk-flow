import { useDispatch, useSelector } from 'react-redux';
import { IAppDispatch, IRootState } from '../../redux/store';
import { useState } from 'react';
import { setDialog } from '../../redux/reducer/dialogReducer';
import { IDialogs } from '../../types/Dialogs/IDialogs';
import './Advertising.css';
import { Blockchain } from '../../blockchains/types.ts';

const ads = {
  [Blockchain.zkSync]: [
    {
      image: '/f62bde80/17b67c1d-0698-4b42-bf17-bdef269deee3.png',
      redirect: 'https://www.universalchains.io/',
      trusted: true,
    },
  ],
  [Blockchain.Scroll]: [
    {
      image: '/f62bde80/17b67c1d-0698-4b42-bf17-bdef269deee3.png',
      redirect: 'https://www.universalchains.io/',
      trusted: true,
    },
  ],
};

export const useAdvertising = (id: 0 | 1) => {
  const { currentBlockchain } = useSelector((s: IRootState) => s.blockchain);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const dispatchCtx = useDispatch<IAppDispatch>();
  const image = ads[currentBlockchain][id].image;

  const onImageLoaded = () => setIsLoaded(true);
  const onError = () => setIsLoaded(false);

  const handleADClick = () => {
    const url = ads[currentBlockchain][id].redirect;
    if (ads[currentBlockchain][id].trusted) window.open(url, '_blank');
    else dispatchCtx(setDialog({ isOpen: IDialogs.UNKNOWN_URL, data: { url } }));
  };

  return { isLoaded, onError, onImageLoaded, handleADClick, image };
};
