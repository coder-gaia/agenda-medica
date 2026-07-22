import { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";

import type { Appointment } from "../../types/appointment";

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

      placeholder: "Nenhum agendamento encontrado.",

      columns: [
        { title: "Data", field: "data" },
        { title: "Horário", field: "horario" },
        { title: "Paciente", field: "paciente" },
        { title: "CPF", field: "cpf" },
        { title: "Médico", field: "medico" },
        { title: "Especialidade", field: "especialidade" },
        { title: "Convênio", field: "convenio" },
        { title: "Status", field: "status" },
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

  return <div ref={tableRef} />;
}