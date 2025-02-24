import React from "react";

import "./Header.css";
import logo from "@/assets/svg/Logo.svg";

const Header: React.FC = () => {
  return (
    <header>
      <img className="logo" src={logo} alt="Logo" />
    </header>
  );
};

export default Header;
