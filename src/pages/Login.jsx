import { useState } from "react";
import { loginUser } from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // console.log(`${name}: ${value}`);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnSumbit = (e) => {
    e.preventDefault();
    // console.log(`formData:`, formData);
    dispatch(loginUser(formData));
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
