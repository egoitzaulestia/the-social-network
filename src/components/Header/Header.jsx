import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const handleOnLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <nav>
      <Link to="/">Home</Link>
      {token ? (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={handleOnLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Header;
