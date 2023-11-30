import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { IWallet } from '../../types/Wallet/IWallet';
import { useCallback } from 'react';

export const useInput = (props: {
  id: string;
  label: string;
  isDropDown?: {
    multiple: boolean;
    inverted: boolean;
  };
  setValue: UseFormSetValue<IWallet>;
  register: UseFormRegister<IWallet>;
  errors: { input: string; message: string } | undefined;
  initialDropdownValues: string[];
}) => {
  const onDropDownChange = useCallback((data: string[]) => props.setValue('blockchain', data), []);

  return { onDropDownChange };
};
