import React from "react";
import { createApi } from "@/services/api";
import Input from "@/components/atoms/Input/Input";
import Table from "@/components/molecules/Table/Table";
import { Employee } from "@/types/employees.interface";
import "./Home.css";

const columns = [
  { header: "FOTO", accessor: "image" },
  { header: "NOME", accessor: "name" },
  { header: "CARGO", accessor: "job", class: "only-desk" },
  {
    header: "DATA DE ADMISSÃO",
    accessor: "admission_date",
    class: "only-desk",
  },
  { header: "TELEFONE", accessor: "phone", class: "only-desk" },
  { header: ".", accessor: "point", class: "only-mobile" },
];

const Home: React.FC = () => {
  const api = createApi();
  const [employees, setEmployees] = React.useState<Employee[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };
    fetchData();
  }, []);

  const getEmployees = async (): Promise<Employee[]> => {
    try {
      const response = await api.get("/employees");
      return response.data;
    } catch {
      alert("Erro ao buscar dados de funcionários");
      return [];
    }
  };

  const handleFilterEmployees = async (search: string) => {
    const data = await getEmployees();

    const filtered = data.filter((employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.job.toLowerCase().includes(search.toLowerCase()) ||
      employee.phone.toLowerCase().includes(search.toLowerCase())
    );
    setEmployees(filtered);
  };

  const debounce = (func: (search: string) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (search: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(search), wait);
    };
  };

  const debouncedHandleFilterEmployees = debounce(handleFilterEmployees, 500);

  return (
    <div className="home">
      <section>
        <h1>Funcionários</h1>
        <Input
          type="text"
          placeholder="Pesquisar"
          onChange={({ target }) => debouncedHandleFilterEmployees(target.value)}
          className="input-search"
        />
      </section>

      <section>
        <Table
          columns={columns}
          data={mapEmployees(employees)}
          className="table-employess"
        />
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
      admission_date: new Date(employee.admission_date).toLocaleDateString(
        "pt-BR"
      ),
      phone: `+${countryCode} (${areaCode}) ${mainNumber}-${lastPart}`,
    };
  });
};