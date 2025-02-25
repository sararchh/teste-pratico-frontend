import React, { useState } from "react";
import "./Table.css";

import { Employee } from "@/types/employees.interface";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { TbPointFilled } from "react-icons/tb";

interface Column {
  header: string;
  accessor: string;
  class?: string;
}

interface TableProps {
  columns: Column[];
  data: Employee[];
  className?: string;
}

const Table: React.FC<TableProps> = ({ columns, data, className }) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const handleRowClick = (rowId: number) => {
    if (window.innerWidth > 768) return;

    setExpandedRows((prevExpandedRows) => {
      const newExpandedRows = new Set(prevExpandedRows);
      if (newExpandedRows.has(rowId)) {
        newExpandedRows.delete(rowId);
      } else {
        newExpandedRows.add(rowId);
      }
      return newExpandedRows;
    });
  };

  return (
    <table className={className}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor as string} className={column?.class}>
              {column.accessor === "point" ? (
                <TbPointFilled className="point-icon" />
              ) : (
                <h2>{column?.header?.toLocaleUpperCase()}</h2>
              )}
            </th>
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
            <React.Fragment key={row.id}>
              <tr
                onClick={() => handleRowClick(row.id)}
                className={expandedRows.has(row.id) ? "expanded" : ""}
              >
                {columns.map((column) => (
                  <td
                    key={`${row.id}-${column.accessor}`}
                    className={column?.class}
                  >
                    {column.accessor === "image" ? (
                      <img
                        src={row[column.accessor]}
                        alt={row.name}
                        width="50"
                      />
                    ) : (
                      <h3>{row[column.accessor]}</h3>
                    )}
                  </td>
                ))}
                <td className="only-mobile">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(row.id);
                    }}
                  >
                    {expandedRows.has(row.id) ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </button>
                </td>
              </tr>
              {expandedRows.has(row.id) && (
                <tr className="expanded-row">
                  <td colSpan={columns.length}>
                    {columns.map((column) => {
                      if (
                        column.accessor !== "job" &&
                        column.accessor !== "admission_date" &&
                        column.accessor !== "phone"
                      )
                        return null;
                      return (
                        <div key={`${row.id}-${column.accessor}-detail`}>
                          <h2>
                            <strong>{column.header}:</strong>
                          </h2>
                          <h3>{row[column.accessor]}</h3>
                        </div>
                      );
                    })}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
