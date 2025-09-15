import { useState } from "react";
import { loginUser } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState(null);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormError(null);
    const { name, value } = e.target;
    // console.log(`${name}: ${value}`);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnSumbit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setFormError("Please fill in all fields");
      return;
    }

    if (status === "loading") return; // avoid spamming

    // console.log(formData);
    if (error) {
      setFormError(error);
    }
    try {
      // unwrap throws if the thunk was rejected
      await dispatch(loginUser(formData)).unwrap();
      navigate("/");
    } catch (error) {
      setFormError(error || "Login failed");
    }

    dispatch(loginUser(formData));
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <form onSubmit={handleOnSumbit}>
      <div>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          id="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={handleOnChange}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={handleOnChange}
        />
      </div>

      {(formError || error) && (
        <p style={{ color: "salmon" }}>{formError || error}</p>
      )}

      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Logging in…" : "Login"}
      </button>
    </form>
  );
};

export default Login;
