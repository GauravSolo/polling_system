import styles from "./Input.module.css";
import type { InputProps } from "./types";

const Input:React.FC<InputProps> = ({value, onChange}) => {
  return (
    <div className={styles.parent}>
        <label className={styles.label}>Enter your name</label>
        <input className={styles.input} type="text" value={value} onChange={onChange}/>
    </div>
  )
}

export default Input