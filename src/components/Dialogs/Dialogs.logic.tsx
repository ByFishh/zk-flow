import { useMemo } from 'react';
import { IDialogs } from '../../types/Dialogs/IDialogs';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import WalletDialog from '../WalletDialog/WalletDialog';
import UnknownUrlDialog from '../UnknownUrlDialog/UnknownUrlDialog';

export const useDialogs = () => {
  const isOpen = useSelector((s: IRootState) => s.dialog.isOpen);

  const dialogs = useMemo(
    () => [
      {
        show: isOpen === IDialogs.DELETE,
        component: <DeleteDialog />,
      },
      {
        show: isOpen === IDialogs.WALLET,
        component: <WalletDialog />,
      },
      {
        show: isOpen === IDialogs.UNKNOWN_URL,
        component: <UnknownUrlDialog />,
      },
    ],
    [isOpen],
  );

  return { isOpen, dialogs };
};
