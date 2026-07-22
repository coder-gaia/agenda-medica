import { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";

import type { Appointment } from "../../types/appointment";

import styles from "./AppointmentTable.module.css";

type Props = {
  data: Appointment[];
};

export default function AppointmentTable({ data }: Props) {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tableRef.current) return;

const table = new Tabulator(tableRef.current, {
  data,

  layout: "fitColumns",

  height: "auto",

  responsiveLayout: "collapse",

  placeholder: "Nenhum agendamento encontrado para a busca realizada.",

  pagination: true,
  paginationSize: 5,
  paginationSizeSelector: [5, 10, 20],

  columns: [
    { title: "Data", field: "data", headerSort: true },
    { title: "Horário", field: "horario", headerSort: true },
    { title: "Paciente", field: "paciente", headerSort: true },
    { title: "CPF", field: "cpf", headerSort: true },
    { title: "Médico", field: "medico", headerSort: true },
    { title: "Especialidade", field: "especialidade", headerSort: true },
    { title: "Convênio", field: "convenio", headerSort: true },
    {
      title: "Status",
      field: "status",
      headerSort: true,
      formatter(cell) {
        return `<strong>${cell.getValue()}</strong>`;
      },
    },
  ],
});

    return () => {
      try {
        table.destroy();
      } catch {
        // Ignora erros do StrictMode em desenvolvimento
      }
    };
  }, [data]);

  return (
    <div
        ref={tableRef}
        className={styles.table}
    />
);
}