interface Props {
  message: string;
}

const ErrorNotification = ({ message }: Props) => {
  return <div className="text-red-500 text-center">{message}</div>;
};

export default ErrorNotification;
