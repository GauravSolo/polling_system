import styles from "./EditOption.module.css";
import type { EditOptionProps } from "./types";

const EditOption: React.FC<EditOptionProps> = ({
  option,
  onChange,
  onCorrectChange,
}) => {
  return (
    <div className="flex justify-between items-center w-full">
      <label className={styles.pill}>{option.id}</label>
      <input
        className={styles.input}
        type="text"
        value={option.text}
        onChange={(e) => onChange(option.id, e.target.value)}
      />
      <div className="flex justify-between w-[139px]">
        <div className="flex items-center ms-8">
          <input className={styles.radio} type="radio" checked={option.isCorrect}
            onChange={() => onCorrectChange(option.id)}/>
          <label className={styles.label}>Yes</label>
        </div>
        <div className="flex items-center ms-8">
          <input className={styles.radio} type="radio" checked={!option.isCorrect}
            onChange={() => onCorrectChange(option.id)} />
          <label className={styles.label}>No</label>
        </div>
      </div>
    </div>
  );
};

export default EditOption;
