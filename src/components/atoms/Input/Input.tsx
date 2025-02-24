import React from "react";
import "./Input.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return <input {...props} className={`input ${className}`} />;
};

export default Input;