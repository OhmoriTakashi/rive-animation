import { IconButton, ListItem, ListItemText, Slider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { SelectedSkill } from "../types/types";

type Props = {
  skill: SelectedSkill;
  onLevelChange: (id: number, level: number) => void;
  onRemove: (id: number) => void;
};

export const SkillListItem = ({ skill, onLevelChange, onRemove }: Props) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" onClick={() => onRemove(skill.id)}>
          <CloseIcon />
        </IconButton>
      }
    >
      <ListItemText primary={skill.name} />
      <Slider
        value={skill.level}
        min={1}
        max={3}
        step={1}
        marks
        onChange={(_, value) => onLevelChange(skill.id, value as number)}
        style={{ width: 150 }}
      />
    </ListItem>
  );
};
