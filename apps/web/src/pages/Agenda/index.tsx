import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppointmentTable from "../../components/AppointmentTable/AppointmentTable";
import { useAuth } from "../../hooks/useAuth";
import { getAppointments } from "../../services/appointments";
import type { Appointment } from "../../types/appointment";

import styles from "./Agenda.module.css";

export default function Agenda() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSearch(term = "") {
    setLoading(true);

    try {
      const response = await getAppointments(term);

      setAppointments(response.data ?? []);
      setMessage(response.message ?? "");
    } catch {
      setAppointments([]);
      setMessage("Não foi possível carregar os agendamentos.");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Agenda Médica</h2>

        <div className={styles.actions}>
          <input
            className={styles.input}
            placeholder="Buscar paciente, CPF ou médico..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className={styles.button}
            onClick={() => handleSearch(search)}
          >
            Buscar
          </button>

          <button
            className={styles.button}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <button
          className={styles.button}
          onClick={() => handleSearch()}
        >
          Carregar Agendamentos
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <AppointmentTable
            key={appointments.length}
            data={appointments}
          />

          {message && (
            <p className={styles.message}>
              {message}
            </p>
          )}
        </>
      )}
    </div>
  );
}