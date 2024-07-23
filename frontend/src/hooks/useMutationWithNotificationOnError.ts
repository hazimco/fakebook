import {
  DefaultError,
  UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import axios from "axios";
import useNotification from "./useNotification";

const useMutationWithNotificationOnError = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
) => {
  const [notification, setNotification] = useNotification();

  const mutation = useMutation({
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setNotification(error.response?.data.error || error.message);
      } else {
        setNotification("Unknown error: " + error);
      }
    },
    ...options,
  });

  return { mutation, notification };
};

export default useMutationWithNotificationOnError;
