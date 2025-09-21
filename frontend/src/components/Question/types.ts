import type { Option } from "../../types";

export interface QuestionProps {
  question: string;
  setQuestion: (val: string) => void;
  options: Option[];
  timer: number;
  setTimer: (time: number)=>void;
  onOptionChange: (id: number, text: string) => void;
  onCorrectChange: (id: number) => void;
  onAddOption: () => void;
}
