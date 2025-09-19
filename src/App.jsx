// Removed App.css - using SASS instead
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";
import Header from "./components/Header/Header";
import Profile from "./pages/Profile/Profile";
import PostDetail from "./components/PostDetail/PostDetail";
import Search from "./components/Search/Search";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* just info */}
            <Route path="/confirm-email" element={<ConfirmEmail />} />
            {/* does the call */}
            <Route path="/confirm/:token" element={<ConfirmEmail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/search/:postName" element={<Search />} />
            <Route path="*" element={<h1>404 NOT FOUND</h1>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
