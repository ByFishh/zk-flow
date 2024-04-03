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
    {
      image: '/f62bde80/29003706-758f-42fe-9192-d3353e6879b0.png',
      redirect:
        'https://bigint.co/launchpad/echoes-of-picasso?utm_source=zkflow&utm_medium=banner&utm_campaign=echoesofpicasso&utm_content=banner_ad1&utm_term=echoesofpicasso_promotion',
      trusted: true,
    },
  ],
  [Blockchain.Scroll]: [],
};

export const useAdvertising = (id: 0 | 1) => {
  const { currentBlockchain } = useSelector((s: IRootState) => s.blockchain);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const dispatchCtx = useDispatch<IAppDispatch>();
  const image = ads[currentBlockchain][id]?.image;

  const onImageLoaded = () => setIsLoaded(true);
  const onError = () => setIsLoaded(false);

  const handleADClick = () => {
    const url = ads[currentBlockchain][id].redirect;
    if (ads[currentBlockchain][id].trusted) window.open(url, '_blank');
    else dispatchCtx(setDialog({ isOpen: IDialogs.UNKNOWN_URL, data: { url } }));
  };

  return { isLoaded, onError, onImageLoaded, handleADClick, image };
};
