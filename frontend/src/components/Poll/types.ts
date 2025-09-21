import type { Option } from "../../types";

interface Question {
  id: number;
  question_text: string;
  timer_duration: number;
  timer_start: string; 
  timer_end: string;  
  options: Option[];
}

export interface PollProps{
    selected?:boolean;
    user?: string;
    question: Question | null;
    submitted: boolean;
    setSubmitted: (submitted:boolean)=>void;
    asked?:number;
    selectedOption?:number | null;
    setSelectedOption?:(selectedOption:number)=>void;
}