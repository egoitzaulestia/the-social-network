import "./App.css";
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* just info */}
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          {/* does the call */}
          <Route path="/confirm/:token" element={<ConfirmEmail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
