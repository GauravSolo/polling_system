import type { Option } from "../../types";

export interface EditOptionProps {
  option: Option;
  onChange: (id: number, text: string) => void;
  onCorrectChange: (id: number) => void;
}
