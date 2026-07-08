import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slices/UserSlice";
import { toggleDarkMode } from "../Redux/Slices/appConfigSlice";

const AVATAR =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s";

// Derive an @handle from the user's email (fallback to their name).
const deriveHandle = (user) => {
  if (!user) return "";
  const base = user.email ? user.email.split("@")[0] : user.name || "user";
  return "@" + base.replace(/\s+/g, "").toLowerCase();
};

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((store) => store.user);
  const darkMode = useSelector((store) => store.appconfigslice.darkMode);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="w-full p-6 dark:bg-[#07070f] dark:text-white min-h-[calc(100vh-4rem)]">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Account section */}
      <section className="max-w-2xl bg-gray-100 dark:bg-[rgb(30,30,30)] rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Account</h2>

        {isAuthenticated && user ? (
          <div className="flex items-center gap-4">
            <img
              className="h-16 w-16 rounded-full object-cover"
              src={AVATAR}
              alt="avatar"
            />
            <div>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {deriveHandle(user)}
              </p>
              {user.email && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="ml-auto px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-300">
              You are not logged in.
            </p>
            <Link
              to="/login"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold"
            >
              Login
            </Link>
          </div>
        )}
      </section>

      {/* Appearance section */}
      <section className="max-w-2xl bg-gray-100 dark:bg-[rgb(30,30,30)] rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Appearance</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Dark mode</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Toggle the light / dark theme for the whole app.
            </p>
          </div>
          <button
            onClick={() => dispatch(toggleDarkMode())}
            role="switch"
            aria-checked={darkMode}
            aria-label="Toggle dark mode"
            className={`relative w-14 h-8 rounded-full transition-colors ${
              darkMode ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white transition-transform ${
                darkMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
