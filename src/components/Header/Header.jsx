import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/authSlice";
import { useState } from "react";
import logo from "../../assets/the-social-network.svg";
import "../../assets/sass/main.scss";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
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
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      {/* Left section with logo */}
      <div className="header__left">
        <div className="header__logo">
          <Link to="/" className="header__logo-link">
            <img 
              src={logo} 
              alt="The Social Network" 
              className="header__logo-image"
            />
          </Link>
        </div>
      </div>

      {/* Center section with search */}
      <div className="header__center">
        <div className="header__search">
          <input
            onKeyUp={handleChange}
            type="text"
            placeholder="Search posts, people, and more..."
            name="search"
            className="header__search-input"
          />
        </div>
      </div>

      {/* Right section with navigation */}
      <div className="header__right">
        <nav className="header__nav">
          <Link 
            to="/" 
            className={`header__nav-link ${isActiveLink('/') ? 'header__nav-link--active' : ''}`}
          >
            Home
          </Link>

          {token ? (
            <>
              <Link 
                to="/profile" 
                className={`header__nav-link ${isActiveLink('/profile') ? 'header__nav-link--active' : ''}`}
              >
                Profile
              </Link>
              <button 
                onClick={handleOnLogout}
                className="header__button header__button--secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`header__nav-link ${isActiveLink('/login') ? 'header__nav-link--active' : ''}`}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="header__button header__button--primary"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
