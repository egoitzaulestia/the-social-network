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

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Encode the search term for URL safety
      const encodedSearchTerm = encodeURIComponent(searchTerm.trim());
      navigate(`/search/${encodedSearchTerm}`);
      console.log("Searching for:", searchTerm);
    }
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Box 1: Logo */}
        <div className="header__box header__box--logo">
          <Link to="/" className="header__logo-link">
            <img 
              src={logo} 
              alt="The Social Network" 
              className="header__logo-image"
            />
          </Link>
        </div>

        {/* Box 2: Search */}
        <div className="header__box header__box--search">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchInput}
            onKeyPress={handleKeyPress}
            placeholder="Search posts..."
            name="search"
            className="header__search-input"
          />
        </div>

        {/* Box 3: Navigation */}
        <div className="header__box header__box--nav">
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
      </div>
    </header>
  );
};

export default Header;
