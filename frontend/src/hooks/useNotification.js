import { useEffect, useState } from "react";

const useNotification = () => {
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
