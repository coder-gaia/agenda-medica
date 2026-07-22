import { useState } from "react";

import styles from "./SearchBar.module.css";

type Props = {
  onSearch: (value: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("");

  function handleSearch() {
    onSearch(value.trim());
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Buscar paciente, CPF ou médico..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />

      <button
        className={styles.button}
        onClick={handleSearch}
      >
        Buscar
      </button>
    </div>
  );
}