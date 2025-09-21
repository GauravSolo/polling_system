import styles from "./PollOption.module.css";

interface PollOptionProps {
  selected?: boolean;
  onClick?: () => void;
  content: string;
  percentage?: number; 
  submitted?:boolean;
}

const PollOption: React.FC<PollOptionProps> = ({
  selected = false,
  onClick,
  content,
  percentage = 0,
  submitted=false
}) => {
  return (
    <div
      className={`${styles.polloption} ${!submitted && selected ? styles.selected : ""}`}
      onClick={onClick}
      style={{ cursor: !submitted ? "pointer" : "default" }}
    >
      <label className={styles.label}>1</label>
      <span className={styles.content}>{content}</span>
      <span className={`absolute right-2 z-1 font-semibold ${!submitted?"hidden":""}`}>{percentage}%</span>
      <span
        className={`filler flex items-center  absolute left-0 top-0 h-full z-0 bg-[#6766D5] rounded-r-[6px] text-white  ${!submitted?"hidden":""}`}
        style={{ width: `${percentage}%` }}
      ></span>
    </div>
  );
};

export default PollOption;