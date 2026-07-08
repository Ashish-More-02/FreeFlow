import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../Redux/Slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL } from "../Utils/Constants";
import AuthLayout, { Field, SubmitButton } from "./AuthLayout";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((store) => store.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Already logged in? Don't show the login form, go home.
  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(setUser(data.user));
        navigate("/home");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <AuthLayout
      heading="Welcome back"
      subheading="Log in to pick up where you left off."
      altPrompt="Don't have an account?"
      altTo="/signup"
      altLabel="Sign up"
    >
      <form className="space-y-5" onSubmit={handleLogin}>
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
          autoComplete="current-password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label className="flex cursor-pointer items-center gap-2 text-sm text-white/70">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 rounded border-white/20 bg-white/5 accent-[#6367FF]"
          />
          Remember me
        </label>

        <SubmitButton>Log in</SubmitButton>
      </form>
    </AuthLayout>
  );
};

export default Login;
