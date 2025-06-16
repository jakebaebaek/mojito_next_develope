import style from "./Button.module.scss";

type TBtnProps = {
  text: string;
  color: "orange" | "gray" | "red";
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button(props: TBtnProps) {
  const { text, color, className, onClick } = props;

  const baseClass =
    color === "orange"
      ? style.orange_button
      : color === "gray"
      ? style.gray_button
      : style.red_button;
  return (
    <button
      className={`${style.button} ${baseClass} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
