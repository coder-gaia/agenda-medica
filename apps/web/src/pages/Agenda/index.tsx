import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppointmentTable from "../../components/AppointmentTable/AppointmentTable";
import { useAuth } from "../../hooks/useAuth";
import { getAppointments } from "../../services/appointments";
import type { Appointment } from "../../types/appointment";

import styles from "./Agenda.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";

import Alert from "../../components/Alert/Alert";

export default function Agenda() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
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
      setMessage("Não foi possível carregar os agendamentos. Tente novamente.");
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

        <SearchBar onSearch={handleSearch} />

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
            <Alert 
            message={message} 
            type={appointments.length ? "success" : "warning"}
            />
        </>
      )}
    </div>
  );
}