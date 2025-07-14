// src/components/LoginForm.js
import React, { useState } from "react";
import "./RegisterForm.css"; // Use same styles for both
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function LoginForm({ switchMode }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = (field, value) => {
    let error = "";

    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        error = "Email is required";
      } else if (!emailRegex.test(value)) {
        error = "Invalid email address";
      }
    }

    if (field === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validate(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Login successful ✅");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login to Your Account</h2>
      <p>Enter your credentials to continue</p>

      <div className="input-wrapper">
        <label>User Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="input-field"
        />
        {errors.email && (
          <span className="error-msg-inline">
            <FontAwesomeIcon icon={faCircleExclamation} /> {errors.email}
          </span>
        )}
      </div>

      <div className="input-wrapper password-wrapper">
        <label>Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="input-field"
        />
        <span className="eye-icon" onClick={() => setShowPassword((prev) => !prev)}>
          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </span>
        {errors.password && (
          <span className="error-msg-inline">
            <FontAwesomeIcon icon={faCircleExclamation} /> {errors.password}
          </span>
        )}
      </div>

      <button type="submit" className="submit-button">Login</button>

      <p className="mt-3">
        Don't have an account?{" "}
        <button type="button" onClick={switchMode} className="btn btn-link p-0">
          Create Account
        </button>
      </p>
    </form>
  );
}

export default LoginForm;
