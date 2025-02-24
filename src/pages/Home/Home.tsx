import React from "react";

import Input from "@/components/atoms/Input/Input";

import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home">
      <section>
        <h1>Funcionários</h1>
        <Input
          type="text"
          placeholder="Pesquisar"
          onChange={({ target }) => console.log(target.value)}
          className="input-search"
        />
      </section>
    </div>
  );
};

export default Home;
