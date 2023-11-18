/* eslint-disable @typescript-eslint/ban-types */
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export const useSearch = (props: { action: Function }) => {
  const { register, handleSubmit } = useForm<{ search: string }>();

  const onSubmit = useCallback((data: { search: string }) => {
    props.action(data.search);
  }, []);

  return { register, handleSubmit, onSubmit };
};
