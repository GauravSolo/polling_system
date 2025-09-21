import style from "./Card.module.css";
import type { CardProps } from "./types";

const Card:React.FC<CardProps> = ({label, content, selected, onClick}) => {
  return (
    <div className={`${style.parent} ${selected ? style.selected : ""}`} onClick={onClick}>
      <h3 className={style.heading}>{label}</h3>
      <p  className={style.para}>
        {content}
      </p>
    </div>
  );
};

export default Card;