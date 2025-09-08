import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  return (
    <form onSubmit={handleOnSumbit}>
      <label htmlFor="name">Name</label>

      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={handleOnChange}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={handleOnChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={handleOnChange}
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        placeholder="confirm password"
        value={confirmPassword}
        onChange={handleOnChange}
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
