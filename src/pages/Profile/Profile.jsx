import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <h1>Profile</h1>
      <p>{user && user.name}</p>
      <p>{user && user.email}</p>
      {/* <img src={user && user.photoUrl} alt="user avatar" width="100" /> */}
      <p>{user && user.createdAt}</p>
    </>
  );
};

export default Profile;
