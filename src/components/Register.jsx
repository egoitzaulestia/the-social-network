import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name}: ${value}`);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnSumbit = (e) => {
    e.preventDefault();
    console.log(`formData: ${formData}`);
  };

  return (
    <form onSubmit={handleOnSumbit}>
      <div>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          placeholder="name"
          name="name"
          value={name}
          onChange={handleOnChange}
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
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
