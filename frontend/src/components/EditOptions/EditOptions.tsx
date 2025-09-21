import type { Option } from "../../types";
import EditOption from "../EditOption/EditOption";
import styles from "./EditOptions.module.css";
import type { EditOptionProps } from "./types";

const EditOptions: React.FC<EditOptionProps> = ({
  options,
  onCorrectChange,
  onOptionChange,
}) => {
  return (
    <div className={styles.parent}>
      <div className="flex justify-between w-full">
        <label className={styles.label}>Edit Options</label>
        <label className={`${styles.label} mr-44`}>Is it correct?</label>
      </div>
      <div className="flex flex-col gap-y-3">
        {options.map((option: Option) => (
          <EditOption
            key={option.id}
            option={option}
            onChange={onOptionChange}
            onCorrectChange={onCorrectChange}
          />
        ))}
      </div>
    </div>
  );
};

export default EditOptions;
