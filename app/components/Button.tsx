"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({ type, fullWidth, children, onClick, secondary, danger, disabled }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 
    focus-visible:outline-offset-2 border-[1px] border-black`,
        disabled && "cursor-not-allowed bg-white text-black",
        fullWidth && "w-full",
        secondary ? " bg-white text-black" : "text-white",
        danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary && !danger && "bg-black hover:opacity-90 focus-visible:outline-sky-600"
      )}
    >
      {children}
    </button>
  );
};
export default Button;
