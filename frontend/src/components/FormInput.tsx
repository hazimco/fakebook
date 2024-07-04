interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  heading: string;
  errorMessage?: string;
}

const FormInput = ({ heading, errorMessage, ...props }: Props) => {
  return (
    <div className="flex flex-col">
      <h2>{heading}</h2>
      <input
        {...props}
        autoCapitalize="off"
        className="border-gray-400 border rounded-md py-1.5 px-2 bg-gray-100"
      />
      <div className="text-red-600">{errorMessage}</div>
    </div>
  );
};

export default FormInput;
