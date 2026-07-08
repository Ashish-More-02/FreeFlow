import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../Images/logo.png";
import { SOFT_GRADIENT } from "../Utils/theme";

export { SOFT_GRADIENT };

const authInputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#8494FF]";

// Labeled input used by both auth forms.
export const Field = ({ label, id, name, ...props }) => (
  <div>
    <label
      htmlFor={id}
      className="mb-1.5 block text-sm font-medium text-white/70"
    >
      {label}
    </label>
    <input id={id} name={name || id} className={authInputClass} {...props} />
  </div>
);

// Gradient submit button shared by both forms.
export const SubmitButton = ({ children }) => (
  <button
    type="submit"
    style={{ backgroundImage: SOFT_GRADIENT }}
    className="w-full rounded-full px-4 py-3 font-semibold text-[#141026] shadow-lg shadow-indigo-500/20 transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070f]"
  >
    {children}
  </button>
);

const AuthLayout = ({
  heading,
  subheading,
  children,
  altPrompt,
  altTo,
  altLabel,
}) => (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07070f] px-5 py-10 text-white">
    {/* Ambient glow */}
    <div
      className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
      style={{ backgroundImage: SOFT_GRADIENT }}
    />

    <div className="relative w-full max-w-md">
      {/* Logo */}
      <Link to="/" className="mb-8 flex items-center justify-center gap-2">
        <img src={logoImg} alt="FreeFlow" className="h-8 w-auto" />
        <span className="font-display text-2xl">FreeFlow</span>
      </Link>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 sm:p-8">
        <h1 className="font-display text-3xl text-center">{heading}</h1>
        {subheading && (
          <p className="mt-2 text-center text-white/60">{subheading}</p>
        )}

        <div className="mt-8">{children}</div>
      </div>

      <p className="mt-6 text-center text-sm text-white/60">
        {altPrompt}{" "}
        <Link
          to={altTo}
          className="font-semibold text-[#8494FF] hover:text-[#C9BEFF]"
        >
          {altLabel}
        </Link>
      </p>
    </div>
  </div>
);

export default AuthLayout;
