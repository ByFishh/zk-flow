import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

export const useHome = () => {
  const { wallets } = useSelector((s: IRootState) => s.wallet);
  const navigate = useNavigate();

  const handleSearch = (data: string) => navigate(`/wallet/${data}`);

  return { handleSearch, wallets };
};
