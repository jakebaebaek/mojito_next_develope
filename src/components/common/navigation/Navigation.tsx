import style from "./Navigation.module.scss";
import UpArrow from "@public/UpArrow.svg";
import DownArrow from "@public/DownArrow.svg";
import Heart from "@public/Heart.svg";
import Edit from "@public/Edit.svg";

type TNavigation = {
  page?: "desc";
};
export default function Navigation(props: TNavigation) {
  const { page } = props;

  return (
    <>
      <ul className={`${style.navigation}`}>
        <li className={`${style.up}`}>
          <UpArrow />
        </li>
        {page === "desc" ? (
          <>
            <li className={`${style.heart_btn}`}>
              <Heart className={`${style.heart_svg}`} />
            </li>
            <li className={`${style.edit_btn}`}>
              <Edit className={`${style.edit_svg}`} />
            </li>
          </>
        ) : null}

        <li className={`${style.down_btn}`}>
          <DownArrow className={`${style.down_svg}`} />
        </li>
      </ul>
    </>
  );
}
