import { useMemo } from "react";
import { Chip } from "@mui/material";
import type { Skill } from "../types/types";

type Props = {
  visibleSkills: Skill[]; // 初期表示されるチップ
  selectedSkills: Skill[];
  onSelect: (skill: Skill, level: number) => void;
};

export const SkillSelector = ({
  visibleSkills,
  selectedSkills,
  onSelect,
}: Props) => {
  // 選択されたスキルをチップから除外
  const availableSkills = useMemo(() => {
    return visibleSkills.filter(
      (skill) => !selectedSkills.some((s) => s.id === skill.id)
    );
  }, [visibleSkills, selectedSkills]);

  return (
    <div>
      {availableSkills.length > 0 ? (
        availableSkills.map((skill) => (
          <Chip
            key={skill.id}
            label={skill.name}
            onClick={() => onSelect(skill, 1)}
            style={{ margin: 4 }}
          />
        ))
      ) : (
        <p>候補のスキルはありません</p>
      )}
    </div>
  );
};
