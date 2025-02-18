import { List } from "@mui/material";
import type { SelectedSkill } from "../types/types";
import { SkillListItem } from "./SkillListItem";

type Props = {
  selectedSkills: SelectedSkill[];
  onLevelChange: (id: number, level: number) => void;
  onRemove: (id: number) => void;
};

export const SelectedSkillList = ({
  selectedSkills,
  onLevelChange,
  onRemove,
}: Props) => {
  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxHeight: "100%",
        overflowY: "auto",
        gap: 4,
        p: 0,
      }}
    >
      {selectedSkills.map((skill) => (
        <SkillListItem
          key={skill.id}
          skill={skill}
          onLevelChange={onLevelChange}
          onRemove={onRemove}
        />
      ))}
    </List>
  );
};
