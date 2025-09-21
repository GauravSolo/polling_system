import styles from "./MoreOption.module.css";
import type { MoreOptionProps } from "./types";

const MoreOption:React.FC<MoreOptionProps> = ({onAddOption}) => {
  return (
    <button className={styles.moreoption} onClick={onAddOption}>
        <span>+</span>
        <span>Add more option</span>
    </button>
  )
}

export default MoreOption;