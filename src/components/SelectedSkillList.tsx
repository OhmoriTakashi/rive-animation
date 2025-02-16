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
    <List>
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
