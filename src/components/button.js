import React from "react";


const sizes = {
  default: "py-4 px-8",
  sm: "py-2 px-4",
  lg: "py-4 px-12",
  xl: "py-5 px-16 text-lg",
  full: "w-full",
};

const disabled = {
  default: false,
  true: true
}

const Button = ({
  children,
  className = "",
  size,
  onclick,
  isDisabled
}) => {
  return (
    <button
      className={`
        ${sizes[size] || sizes.default}
        ${className}
        sm:ml-1 
        text-white 
        font-bold 
        rounded 
        outline-none 
        focus:outline-none
        cursor-pointer
        whitespace-nowrap
        mr-1
        uppercase
        text-sm
        shadow
        hover:shadow-lg
        inline-block
        transition-colors
        disabled:bg-gray-500
        bg-blue-800
    `}
    onClick={onclick}
    disabled={disabled[isDisabled] || disabled.default}
    >
      {children}
    </button>
  );
};

export { Button };
