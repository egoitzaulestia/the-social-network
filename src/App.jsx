import "./App.css";
import Register from "./components/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from "./components/Login";
import ConfirmEmail from "./components/ConfirmEmail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
