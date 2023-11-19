import { UseFormSetValue } from "react-hook-form";
import { IWallet } from "../../types/Wallet/IWallet";
import { useCallback } from "react";

export const useInput = (props: {
  id: string;
  label: string;
  isDropDown?: {
    multiple: boolean;
    inverted: boolean;
  };
  setValue: UseFormSetValue<IWallet>;
}) => {
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const target = e.target.getAttribute("id");
      if (!target) return;
      props.setValue(target as "name" | "adress", e.target.value);
    },
    []
  );

  const onDropDownChange = useCallback((data: string[]) => {
    props.setValue("blockchain", data);
  }, []);

  return { handleInput, onDropDownChange };
};
