import style from "./Button.module.scss";

type TBtnProps = {
  text: string;
  color: "orange" | "gray";
};

export default function Button(props: TBtnProps) {
  const { text, color } = props;
  return (
    <>
      {color === "orange" && (
        <button className={`${style.orange_button} ${style.button}`}>
          {text}
        </button>
      )}
      {color === "gray" && (
        <button className={`${style.gray_button} ${style.button}`}>
          {text}
        </button>
      )}
    </>
  );
}
