import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleOnLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <nav>
      <h1>Header</h1>
      {user ? (
        <button onClick={handleOnLogout}>Logout</button>
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
