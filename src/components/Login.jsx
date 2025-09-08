import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name}: ${value}`);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <form>
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
    </form>
  );
};

export default Login;
