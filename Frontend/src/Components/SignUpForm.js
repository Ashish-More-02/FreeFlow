import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../Utils/Constants";
import AuthLayout, { Field, SubmitButton } from "./AuthLayout";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Password matching validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch(`${BACKEND_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("User registered successfully. Please log in.");
        navigate("/login");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Sign-up error:", err);
    }
  };

  return (
    <AuthLayout
      heading="Create your account"
      subheading="Join FreeFlow — it only takes a moment."
      altPrompt="Already have an account?"
      altTo="/login"
      altLabel="Log in"
    >
      <form className="space-y-5" onSubmit={handleSignUp}>
        <Field
          label="Full name"
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Ada Lovelace"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Field
          label="Email address"
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Field
          label="Password"
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Field
          label="Confirm password"
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <SubmitButton>Create account</SubmitButton>
      </form>
    </AuthLayout>
  );
};

export default SignUpForm;
