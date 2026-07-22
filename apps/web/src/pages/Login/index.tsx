import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { loginRequest } from "../../services/auth";
import { useAuth } from "../../hooks/useAuth";

import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setError("");

    if (!user.trim() || !password.trim()) {
      setError("Preencha usuário e senha.");
      return;
    }

    try {
      setLoading(true);

      await loginRequest({
        login: user,
        password,
      });

      login();

      navigate("/agenda");

    } catch (err) {

      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ??
          "Falha ao realizar login."
        );
      } else {
        setError("Erro inesperado.");
      }

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <h2 className={styles.title}>
          Agenda Médica
        </h2>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >

          <input
            className={styles.input}
            placeholder="Usuário ou e-mail"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <span className={styles.error}>
              {error}
            </span>
          )}

          <button
            className={styles.button}
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

        </form>

      </div>
    </div>
  );
}