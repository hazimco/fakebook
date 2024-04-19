const Profile = ({ loggedInUser }) => {
  return (
    <div>
      <h1>Profile of {loggedInUser.username}</h1>
      <div>
        <div>
          <h4>Following:</h4>
        </div>
        <div>
          <h4>Followed by:</h4>
        </div>
      </div>
    </div>
  );
};

export default Profile;
