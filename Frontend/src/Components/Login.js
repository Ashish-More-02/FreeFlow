import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import logoImg from "../Images/logo.png";
import { useSelector } from "react-redux";
import { setUser } from "../Redux/Slices/UserSlice";
import { useDispatch } from "react-redux";


const Login = () => {

  const dispatch = useDispatch();

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    // Add your login logic here
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login successful");
        console.log("Logged in user:", data.user);
        setLoginSuccess(true);
        dispatch(setUser(data.user));
        navigate("/");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col dark:bg-black dark:text-white">
      <Link to="/">
        <div className="flex justify-center items-center my-8">
          <img
            className="h-9 cursor-pointer m-2"
            alt="logo"
            src={logoImg}
          ></img>
          <h1 className="text-4xl font-bold"> FreeFlow </h1>
        </div>
      </Link>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md dark:bg-[rgb(30,30,30)] dark:text-white">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-50">Login</h2>
        {loginSuccess ? (
          <p className="text-center text-green-500">Login successful!</p>
        ) : (
          <form className="space-y-4 bg-white dark:bg-inherit dark:text-white" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 bg-white dark:bg-inherit dark:text-gray-50
            "
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-[rgb(60,60,60)] dark:border-black"
              />
            </div>
            <div className="bg-inherit">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 bg-white dark:bg-inherit dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-[rgb(60,60,60)] dark:border-black"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-600"
              >
                Remember Me
              </label>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
            >
              Login
            </button>
          </form>
        )}
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
