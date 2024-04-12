const User = ({ username, postCount }) => {
  return (
    <div className="user">
      <div className="username">{username}</div>
      <div className="postCount">{postCount} posts</div>
    </div>
  );
};

export default User;
