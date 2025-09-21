import type { ButtonProps } from "./types";
import styles from "./Button.module.css";

const Button: React.FC<ButtonProps> = (props) => {
  const {icon, label, onClick, type = "button", style, disabled } = props;

  return (
    <button
      onClick={onClick}
      className={`${type === "pill" ? styles.pill : styles.button}  ${disabled?styles.disabled:""}`}
      style={{...style}}
      disabled={disabled}
    >
      {icon}
      <span className={`${type === "pill" ? styles.pillLabel : styles.buttonLabel}`}>{label}</span>
    </button>
  );
};

export default Button;
