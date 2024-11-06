import style from "./Navigation.module.scss";
import UpArrow from "@public/UpArrow.svg";
import DownArrow from "@public/DownArrow.svg";
import Heart from "@public/Heart.svg";
import Edit from "@public/Edit.svg";

export default function Navigation() {
  return (
    <>
      <ul className={`${style.navigation}`}>
        <li className={`${style.up}`}>
          <UpArrow />
        </li>
        <li className={`${style.heart_btn}`}>
          <Heart className={`${style.heart_svg}`} />
        </li>
        <li className={`${style.edit_btn}`}>
          <Edit className={`${style.edit_svg}`} />
        </li>
        <li className={`${style.down_btn}`}>
          <DownArrow className={`${style.down_svg}`} />
        </li>
      </ul>
    </>
  );
}
