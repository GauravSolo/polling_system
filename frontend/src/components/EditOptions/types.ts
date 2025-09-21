import type { Option } from "../../types";

export interface EditOptionProps{
  options: Option[];
  onOptionChange: (id: number, text: string) => void;
  onCorrectChange: (id: number) => void;
}