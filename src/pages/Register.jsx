import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/auth/authSlice";
import { notification } from "antd";

const Register = () => {
  const dispatch = useDispatch();

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
    console.log(`${name}: ${value}`);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnSumbit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return notification.error({
        message: "Error",
        description: "Passwords do not match",
      });
    } else if (password.length < 6) {
      return notification.error({
        message: "Error",
        description: "Password must be at least 6 characters",
      });
    } else if (!name || !email || !age) {
      return notification.error({
        message: "Error",
        description: "Please fill in all fields",
      });
    } else if (age < 18) {
      return notification.error({
        message: "Error",
        description: "You must be at least 18 years old to register",
      });
    } else {
      notification.success({
        message: "Success",
        description:
          "Registration successful! Please check your email to confirm your account.",
      });
    }
    console.log(`formData: ${formData}`);
    dispatch(registerUser(formData));
  };

  return (
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
  );
};

export default Register;
