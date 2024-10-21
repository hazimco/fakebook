import { useState } from "react";
import ErrorNotification from "../../components/ErrorNotification";
import useEditDescription from "../../hooks/useEditDescription";

interface Props {
  description: string;
}

const Description = ({ description }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");

  const { mutation: editDescriptionMutation, notification: error } =
    useEditDescription();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    editDescriptionMutation.mutate(text);
    setText("");
    setShowForm(false);
  };

  return showForm ? (
    <form
      className="flex flex-col flex-1 text-sm gap-2"
      onSubmit={handleSubmit}
    >
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="py-1.5 px-2 border-blue-400 border rounded-md resize-none flex-1"
        autoFocus
        maxLength={240}
      >
        {description}
      </textarea>
      <div className="flex gap-2">
        <button className="bg-green-300 hover:bg-green-200 active:bg-green-400 px-3 rounded-md">
          Done
        </button>
        <button
          onClick={() => setShowForm(false)}
          className="bg-red-500 hover:bg-red-400 active:bg-red-600 px-3 rounded-md text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <>
      {description && <p className="text-sm">{description}</p>}
      <button
        onClick={() => setShowForm(true)}
        className="border border-slate-400 bg-slate-300 rounded-md text-sm self-start px-1.5"
      >
        {description ? "Edit description" : "Add description"}
      </button>
      <ErrorNotification message={error} />
    </>
  );
};

export default Description;
