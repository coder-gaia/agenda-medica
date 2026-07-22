import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { AxiosError } from "axios";

import AppointmentTable from "../../components/AppointmentTable/AppointmentTable";
import { useAuth } from "../../hooks/useAuth";
import { getAppointments } from "../../services/appointments";
import type { Appointment } from "../../types/appointment";

import styles from "./Agenda.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";

import Alert from "../../components/Alert/Alert";

import Loading from "../../components/Loading/Loading";

export default function Agenda() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSearch = useCallback(async (term = "") => {
  setLoading(true);

  try {
    const response = await getAppointments(term);

    setAppointments(response.data ?? []);
    setMessage(response.message ?? "");
  }catch (error: unknown) {
    console.error(error);

    setAppointments([]);

    if (error instanceof AxiosError) {
      setMessage(
        error.response?.data?.message ??
        "Não foi possível carregar os agendamentos."
      );

      return;
    }

  setMessage("Ocorreu um erro inesperado.");
} finally {
    setLoading(false);
  }
}, []);


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

      {loading ? (
        <Loading />
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