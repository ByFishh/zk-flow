import { useNavigate } from 'react-router-dom';

export const useNoWallet = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate('/');
  return { handleClick };
};
