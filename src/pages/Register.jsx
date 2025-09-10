import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/auth/authSlice";
import { notification } from "antd";

const Register = () => {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, age, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // console.log(`${name}: ${value}`);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnSumbit = async (e) => {
    e.preventDefault();
    const numAge = Number(age); // We convert age to a number for comparison

    if (password !== confirmPassword)
      return api.error({
        message: "Error",
        description: "Passwords do not match",
      });
    if (password.length < 6)
      return api.error({
        message: "Error",
        description: "Password must be at least 6 characters",
      });
    if (!name || !email || !age)
      return api.error({
        message: "Error",
        description: "Please fill in all fields",
      });
    if (numAge < 18)
      return api.error({
        message: "Error",
        description: "You must be at least 18 to register",
      });

    try {
      const payload = await dispatch(registerUser(formData)).unwrap(); // throws on reject
      api.success({
        message: "Success",
        description: `Welcome ${payload.user.name}! Check your email to confirm.`,
      });
    } catch (err) {
      api.error({
        message: "Registration failed",
        description: String(err || "Please try again."),
      });
    }
  };

  return (
    <>
      {contextHolder}
      <form onSubmit={handleOnSumbit}>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            placeholder="name"
            name="name"
            value={name}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <br />
          <input
            type="number"
            id="age"
            placeholder="age"
            name="age"
            value={age} // Uncomment and manage age state if needed
            onChange={handleOnChange}
          />
        </div>

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
            name="password"
            placeholder="password"
            value={password}
            onChange={handleOnChange}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <br />
          <input
            type="password"
            id="confirmPassword"
            placeholder="confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleOnChange}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
