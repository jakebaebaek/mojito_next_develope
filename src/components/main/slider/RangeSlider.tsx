import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { theme } from "@/styles/theme";
import { useFilterValueStore } from "@/lib/store/filterValueStore";

type Props = {
  whatSliderIsIt: "booziness" | "sweetness";
};

export default function RangeSlider({ whatSliderIsIt }: Props) {
  // 알코올 도수 슬라이더
  const alcohol = useFilterValueStore((state) => state.booziness);
  const setAlcohol = useFilterValueStore((state) => state.setBooziness);

  // 당도 슬라이더
  const sweetness = useFilterValueStore((state) => state.sweetness);
  const setSweetness = useFilterValueStore((state) => state.setSweetness);
  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (Array.isArray(newValue) && whatSliderIsIt === "booziness") {
      setAlcohol(newValue);
      console.log("booziness", newValue);
    } else if (Array.isArray(newValue) && whatSliderIsIt === "sweetness") {
      setSweetness(newValue);
      console.log("sweetness", newValue);
    }
  };
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        min={0}
        max={10}
        step={1}
        value={whatSliderIsIt === "booziness" ? alcohol : sweetness}
        onChange={handleChange}
        marks={[
          { value: 0, label: "0" },
          { value: 10, label: "10" },
        ]}
        valueLabelDisplay="auto"
        getAriaLabel={() => "Range slider"}
        sx={{
          color: theme.mainColor,

          // 썸(thumb)
          "& .MuiSlider-thumb": {
            backgroundColor: theme.mainColor,
            border: "2px solid #fff",
            width: 20,
            height: 20,
          },

          // 트랙 (선택된 부분)
          "& .MuiSlider-track": {
            backgroundColor: theme.lightMainColor,
            border: "none",
          },

          // 레일 (선택되지 않은 부분)
          "& .MuiSlider-rail": {
            backgroundColor: theme.gray300,
          },

          // 마크 (작은 점)
          "& .MuiSlider-mark": {
            backgroundColor: theme.mainColor,
            width: 10,
          },

          // 마크 라벨
          "& .MuiSlider-markLabel": {
            color: "black",
            fontSize: "1.5rem",
          },

          // ⭐ valueLabel (숫자 라벨)
          "& .MuiSlider-valueLabel": {
            backgroundColor: "white",
            color: theme.gray500,
            borderRadius: "4px",
            fontSize: "1.5rem",
            bottom: -65,
            top: "auto",
            boxShadow: 1,
            "&::before": {
              display: "block",
              position: "absolute",
              width: 8,
              height: 8,
              backgroundColor: "white",
              content: '""',
              left: "50%",
              top: -4,
              transform: "translateX(-50%) rotate(45deg)",
            },
            "& *": {
              background: "transparent",
              color: theme.mainColor,
            },
          },
        }}
      />
    </Box>
  );
}
