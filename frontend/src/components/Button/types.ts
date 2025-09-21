export interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "pill";
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}