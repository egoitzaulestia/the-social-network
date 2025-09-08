import React from "react";
import { Link } from "react-router-dom";

const ConfirmEmail = () => {
  return (
    <div>
      <h2>Confirm Email Page</h2>
      <p>Please check your email to confirm your account.</p>
      <Link to="/login">
        <button>Go to Login</button>
      </Link>
    </div>
  );
};

export default ConfirmEmail;
