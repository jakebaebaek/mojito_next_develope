import style from "./Navigation.module.scss";
import Arrow from "@public/Arrow.svg";

export default function Navigation() {
  return (
    <>
      <div className={`${style.navigation}`}>
        <Arrow className={`${style.up}`} />
        <Arrow className={`${style.down}`} />
      </div>
    </>
  );
}
