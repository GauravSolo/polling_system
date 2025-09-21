import style from "./Heading.module.css";
import type { HeadingProps } from "./types";

const Heading: React.FC<HeadingProps> = ({
  content = "",
  boldTextHeading = "",
  boldTextPara = "",
  para = "",
  align = "left",
}) => {
  const heading_parts = boldTextHeading
    ? content.split(boldTextHeading)
    : [content];
  const para_parts = boldTextPara ? para.split(boldTextPara) : [para];

  return (
    <div className={`${style.parent}  ${style[align]}`}>
      <h1 className={style.heading}>
        {heading_parts[0]}
        {boldTextHeading && <b>{boldTextHeading}</b>}
        {heading_parts[1] || ""}
      </h1>
      <p className={style.para}>
        {para_parts[0]}
        {boldTextPara && <b>{boldTextPara}</b>}
        {para_parts[1] || ""}
      </p>
    </div>
  );
};

export default Heading;
