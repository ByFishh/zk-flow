import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

export const useHome = () => {
  const { wallets } = useSelector((s: IRootState) => s.wallet);
  const { currentBlockchain } = useSelector((s: IRootState) => s.blockchain);
  const navigate = useNavigate();

  const handleSearch = (data: string) => {
    navigate(`/wallet/${currentBlockchain}/${data}`);
  };

  return { handleSearch, wallets };
};
