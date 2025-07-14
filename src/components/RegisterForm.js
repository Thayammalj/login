import React, { useState } from "react";
import "./RegisterForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function RegisterForm({ switchMode }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trimStart();

    setFormData((prev) => ({ ...prev, [name]: trimmedValue }));

    switch (name) {
      case "username":
        setErrors((prev) => ({
          ...prev,
          username: trimmedValue === "" ? "Username is required" : "",
        }));
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors((prev) => ({
          ...prev,
          email: !emailRegex.test(trimmedValue) ? "Invalid email address" : "",
        }));
        break;
      case "phone":
        const phoneRegex = /^[6-9]\d{9}$/;
        setErrors((prev) => ({
          ...prev,
          phone: !phoneRegex.test(trimmedValue)
            ? "Enter a valid 10-digit Indian phone number"
            : "",
        }));
        break;
      case "password":
        setErrors((prev) => ({
          ...prev,
          password:
            trimmedValue.length < 6
              ? "Password must be at least 6 characters"
              : "",
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian phone number";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Form is valid ✅");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create An Account</h2>
      <p>Fill the details to get started</p>

      <div className="input-wrapper">
        <label>User Name</label>
        <input
          type="text"
          name="username"
          placeholder="Enter your user name"
          value={formData.username}
          onChange={handleChange}
          className="input-field"
        />
        {errors.username && (
          <span className="error-msg-inline">
            <FontAwesomeIcon icon={faCircleExclamation} /> {errors.username}
          </span>
        )}
      </div>

      <div className="input-wrapper">
        <label>User Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your user email"
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

      <div className="input-wrapper">
        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
          className="input-field"
          maxLength={10}
        />
        {errors.phone && (
          <span className="error-msg-inline">
            <FontAwesomeIcon icon={faCircleExclamation} /> {errors.phone}
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

      <button type="submit" className="submit-button">
        Sign Up
      </button>

      <p className="mt-3">
        Already have an account?{' '}
        <button onClick={switchMode} className="btn btn-link p-0">
          Sign In
        </button>
      </p>
    </form>
  );
}

export default RegisterForm;