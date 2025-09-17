import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/authSlice";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const { token } = useSelector((state) => state.auth);

  const handleOnLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate("/");
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.key === "Enter") {
      navigate(`/search/${searchTerm}`);

      console.log(searchTerm);
    }

    // console.log(e.target.value);
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <input
        onKeyUp={handleChange}
        type="text"
        placeholder="Search..."
        name="search"
      />

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
