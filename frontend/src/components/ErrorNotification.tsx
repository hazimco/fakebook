interface Props {
  message: string;
  className?: string;
}

const ErrorNotification = ({ message, className }: Props) => {
  return (
    <div className={`text-red-500 text-center ${className ? className : ""}`}>
      {message}
    </div>
  );
};

export default ErrorNotification;
