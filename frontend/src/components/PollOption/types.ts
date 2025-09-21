export interface PollOptionProps {
  idx:number;
  selected?: boolean;
  onClick?: () => void;
  content: string;
  percentage?: number; 
  submitted?:boolean;
}
