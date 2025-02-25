import React from "react";
import styles from "./Input.module.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return <input {...props} className={`${styles.input} ${className}`} />;
};

export default Input;