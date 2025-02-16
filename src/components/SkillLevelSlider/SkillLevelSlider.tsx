import React, { useState } from "react";
import "./SkillLevelSlider.css";

type SkillLevelSliderProps = {
  steps: number;
};

export const SkillLevelSlider: React.FC<SkillLevelSliderProps> = ({
  steps,
}) => {
  const [value, setValue] = useState(1);
  const marks = Array.from({ length: steps + 1 }, (_, i) => i);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue === 0 ? 1 : newValue); // 0 を選択不可
  };

  // 数値に応じた色の取得
  const getTrackColor = (val: number) => {
    const percentage = val / steps;
    if (percentage < 0.66) return "#F9FFBB";
    if (percentage < 1) return "#D0C8FF";
    return "#EDE1B2";
  };

  const trackColor = getTrackColor(value);

  return (
    <div className="slider-container">
      <input
        type="range"
        min="0"
        max={steps}
        step="1"
        value={value}
        onChange={handleChange}
        className="skill-slider"
        style={{
          background: `linear-gradient(to right, ${trackColor} 0%, ${trackColor} ${
            (value / steps) * 100
          }%, #ddd ${(value / steps) * 100}%, #ddd 100%)`,
        }}
      />
      <div className="marks">
        {marks.map((mark) => (
          <span key={mark} className={`mark ${mark === 0 ? "disabled" : ""}`}>
            {mark}
          </span>
        ))}
      </div>
    </div>
  );
};
