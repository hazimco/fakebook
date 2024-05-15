import { SetStateAction, useEffect, useState } from "react";

const useNotification = (): [
  string,
  React.Dispatch<SetStateAction<string>>
] => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  return [message, setMessage];
};

export default useNotification;
