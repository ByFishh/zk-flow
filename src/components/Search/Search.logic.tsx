/* eslint-disable @typescript-eslint/ban-types */
import { useForm } from 'react-hook-form';

export const useSearch = (props: { action: Function }) => {
  const { register, handleSubmit } = useForm<{ search: string }>();

  const onSubmit = (data: { search: string }) => {
    props.action(data.search);
  };

  return { register, handleSubmit, onSubmit };
};
