export interface CardProps{
    label: string;
    content: string;
    selected?: boolean;
    onClick?:()=> void;
}