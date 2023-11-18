import { useMemo } from "react";
import { IDialogs } from "../../types/Dialogs/IDialogs";
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";

export const useDialogs = () => {
  const isOpen = useSelector((s: IRootState) => s.dialog.isOpen);

  const dialogs = useMemo(
    () => [
      {
        show: isOpen === IDialogs.DELETE,
        component: <DeleteDialog />,
      },
    ],
    [isOpen]
  );

  return { isOpen, dialogs };
};
