import React from "react";
import { createApi } from "@/services/api";
import Input from "@/components/atoms/Input/Input";
import Table from "@/components/molecules/Table/Table";
import { Employee } from "@/types/employees.interface";
import "./Home.css";

const columns = [
  { header: "FOTO", accessor: "image" },
  { header: "NOME", accessor: "name" },
  { header: "CARGO", accessor: "job" },
  { header: "DATA DE ADMISSÃO", accessor: "admission_date" },
  { header: "TELEFONE", accessor: "phone" },
];

const Home: React.FC = () => {
  const [employees, setEmployees] = React.useState<Employee[]>([]);

  React.useEffect(() => {
    const api = createApi();
    api
      .get("/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch(() => {
        alert("Erro ao buscar dados de funcionários");
      });
  }, []);

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

      <section>
        <Table columns={columns} data={mapEmployees(employees)} className="table-employess"/>
      </section>
    </div>
  );
};

export default Home;

const mapEmployees = (employees: Employee[]) => {
  return employees.map((employee) => {
    const phone = employee.phone;

    if (phone.length !== 13) {
      return employee;
    }

    const countryCode = phone.slice(0, 2);
    const areaCode = phone.slice(2, 4);
    const mainNumber = phone.slice(4, 9);
    const lastPart = phone.slice(9);

    return {
      ...employee,
      admission_date: new Date(employee.admission_date).toLocaleDateString("pt-BR"),
      phone: `+${countryCode} (${areaCode}) ${mainNumber}-${lastPart}`,
    };
  });
};