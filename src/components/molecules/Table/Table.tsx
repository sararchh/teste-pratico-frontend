import React from "react";
import "./Table.css";
import { Employee } from "@/types/employees.interface";

interface Column {
  header: string;
  accessor: string;
}

interface TableProps {
  columns: Column[];
  data: Employee[];
  className?: string;
}

const Table: React.FC<TableProps> = ({ columns, data, className }) => {
  return (
    <table className={className}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}><h2>{column.header}</h2></th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="no-data">
              <h3>Nenhum dado disponível</h3>
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.accessor as string}>
                  {column.accessor === "image" ? (
                    <img src={row[column.accessor]} alt={row.name} width="50" />
                  ) : (
                    <h3> {row[column.accessor]} </h3>
                  )}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
