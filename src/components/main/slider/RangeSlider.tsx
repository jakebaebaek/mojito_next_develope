"use client";

import { useState } from "react";
import style from "./RangeSlider.module.scss";

export default function RangeSlider() {
  const [value, setValue] = useState(6);

  return (
    <div className={`${style.slider}`}>
      <div
        className={`${style.rail}`}
        style={{ width: `${100 - (value / 10) * 100}%` }}
      ></div>
      <input
        type="range"
        min="0"
        max="10"
        step="2"
        onChange={(e) => setValue(Number(e.target.value))}
      ></input>
    </div>
  );
}
