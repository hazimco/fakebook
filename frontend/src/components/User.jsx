const User = ({ username, postCount }) => {
  const userStyle = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      border: "solid",
      borderColor: "lightgray",
      borderRadius: 6,
      borderWidth: 1,
      padding: 20,
      marginBottom: 10,
      fontFamily: "Arial",
      fontSize: 18,
    },
    username: {
      fontWeight: "bold",
    },
    postCount: {
      fontStyle: "italic",
    },
  };

  return (
    <div style={userStyle.container}>
      <div style={userStyle.username}>{username}</div>
      <div style={userStyle.postCount}>{postCount} posts</div>
    </div>
  );
};

export default User;
