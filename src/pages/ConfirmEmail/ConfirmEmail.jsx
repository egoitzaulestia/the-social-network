// src/pages/ConfirmEmail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import authService from "../../redux/auth/authService";

const ConfirmEmail = () => {
  const { token } = useParams(); // present on /confirm/:token
  const [status, setStatus] = useState(token ? "loading" : "idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await authService.confirmEmail(token);
        setStatus("success");
        setMessage(res?.message || "Email confirmed!");
      } catch (err) {
        setStatus("error");
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Confirmation failed.";
        setMessage(msg);
      }
    })();
  }, [token]);

  // No token → show instructions after registration
  if (!token) {
    return (
      <div>
        <h2>Confirm your email</h2>
        <p>We sent you a confirmation link. Please check your inbox.</p>
      </div>
    );
  }

  // Token present → show result
  return (
    <div>
      {status === "loading" && <p>Confirming your account…</p>}

      {status === "success" && (
        <>
          <h2>All set ✨</h2>
          <p>{message}</p>
          <Link to="/login">
            <button>Go to Login</button>
          </Link>
        </>
      )}

      {status === "error" && (
        <>
          <h2>Oops</h2>
          <p>{message}</p>
          <Link to="/login">
            <button>Back to Login</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default ConfirmEmail;
