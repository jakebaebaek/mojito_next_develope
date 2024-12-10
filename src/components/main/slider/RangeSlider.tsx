"use client";

import { useState } from "react";
import style from "./RangeSlider.module.scss";

export default function RangeSlider() {
  const [value, setValue] = useState(5);

  const onClicklevel = (prop: Number) => {
    switch (prop) {
      case 1:
        setValue(1);
        break;
      case 5:
        setValue(5);
        break;
      case 10:
        setValue(10);
        break;
    }
  };

  return (
    <>
      <div className={`${style.slider}`}>
        <div
          className={`${style.rail}`}
          style={{ width: `${100 - (value / 10) * 100}%` }}
        ></div>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          onChange={(e) => setValue(Number(e.target.value))}

          // style={{ "--thumb-left": `${value * 10}%` } as React.CSSProperties}
        ></input>
      </div>
      <div className={`${style.levels}`}>
        <span onClick={() => onClicklevel(1)} className={`${style.level_one}`}>
          1
        </span>
        <span onClick={() => onClicklevel(5)}>5</span>
        <span onClick={() => onClicklevel(10)}>10</span>
      </div>
    </>
  );
}
