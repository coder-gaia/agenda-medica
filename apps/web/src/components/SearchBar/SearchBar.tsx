import { useEffect, useState } from "react";

import { useDebounce } from "../../hooks/useDebounce";

import styles from "./SearchBar.module.css";

type Props = {
  onSearch: (value: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("");

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    onSearch(debouncedValue.trim());
  }, [debouncedValue, onSearch]);

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="Buscar paciente, CPF ou médico..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}