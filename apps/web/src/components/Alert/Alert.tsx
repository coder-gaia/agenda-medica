import styles from "./Alert.module.css";

type Props = {
  message: string;
  type?: "success" | "error" | "warning";
};

export default function Alert({
  message,
  type = "success",
}: Props) {
  if (!message) return null;

  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      {message}
    </div>
  );
}