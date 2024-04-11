import { format } from "date-fns";

const Post = ({ text, createdAt, username }) => {
  const postStyle = {
    container: {
      border: "solid",
      borderColor: "lightgray",
      borderRadius: 6,
      borderWidth: 1,
      padding: 20,
      marginBottom: 10,
      fontFamily: "Arial",
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 15,
    },
    text: {
      fontSize: 18,
      marginBottom: 20,
    },
    createdAt: {
      fontSize: 12,
    },
  };

  return (
    <div style={postStyle.container}>
      <div style={postStyle.title}>{username}</div>
      <div style={postStyle.text}>{text}</div>
      <div style={postStyle.createdAt}>
        {format(createdAt, "HH:mm - MMM dd, yyyy")}
      </div>
    </div>
  );
};

export default Post;
