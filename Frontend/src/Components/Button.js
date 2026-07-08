import React from "react";

const Button = ({ name, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-[rgb(45,45,45)] dark:text-white dark:hover:bg-[rgb(65,65,65)]"
      }`}
    >
      {name}
    </button>
  );
};

export default Button;
