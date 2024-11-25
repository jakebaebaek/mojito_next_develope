"use client";

import { useState } from "react";
import style from "./RangeSlider.module.scss";

export default function RangeSlider() {
  const [value, setValue] = useState(8);

  return (
    <div className={`${style.slider}`}>
      <input
        type="range"
        min="0"
        max="10"
        step="2"
        // style={{
        //   background: `linear-gradient(to right, #ffad6f ${value}%, #e5e5e5 ${value}%)`,
        // }}
      ></input>

      {/* <div className="slider-value">Value: {value}</div> */}
    </div>
  );
}
