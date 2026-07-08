import React from "react";
import { SOFT_GRADIENT } from "../Utils/theme";

const Button = ({ name, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={active ? { backgroundImage: SOFT_GRADIENT } : undefined}
      className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "text-[#141026] shadow-md shadow-indigo-500/20"
          : "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
      }`}
    >
      {name}
    </button>
  );
};

export default Button;
