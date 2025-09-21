import EditOptions from "../EditOptions/EditOptions";
import MoreOption from "../MoreOption/MoreOption";
import styles from "./Question.module.css";
import type { QuestionProps } from "./types";

const Question: React.FC<QuestionProps> = ({
  question,
  setQuestion,
  options,
  timer,
  setTimer,
  onOptionChange,
  onCorrectChange,
  onAddOption,
}) => {
  return (
    <div className={styles.parent}>
      <div className="flex justify-between items-center w-full">
        <label className={styles.label}>Enter your question</label>
        <select
          className={styles.select}
          value={timer}
          onChange={(e) => setTimer(Number(e.target.value))}
        >
          <option value={30}>30 seconds</option>
          <option value={60}>60 seconds</option>
          <option value={90}>90 seconds</option>
          <option value={120}>120 seconds</option>
        </select>
      </div>
      <div className="relative w-full">
        <textarea
          className={styles.textarea}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={100}
        />
        <div className="absolute text-gray-800 bottom-7 right-3 text-sm">
          {question.length}/{100}
        </div>
      </div>
      <EditOptions
        options={options}
        onOptionChange={onOptionChange}
        onCorrectChange={onCorrectChange}
      />
      <div className="ps-8">
        <MoreOption onAddOption={onAddOption} />
      </div>
    </div>
  );
};

export default Question;
