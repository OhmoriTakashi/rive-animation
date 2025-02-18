import {
  IconButton,
  ListItem,
  ListItemText,
  Slider,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { SelectedSkill } from "../types/types";
import { SkillLevelIcon } from "./SkillLevelIcon";

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
      sx={{
        width: "calc(100% - 4px)",
        bgcolor: "#ffffff",
        px: 2,
        py: 1,
        borderRadius: 4,
        border: "1px solid #020A10",
        boxShadow: "4px 4px 0px rgba(64, 64, 66, 0.8)",
      }}
    >
      <SkillLevelIcon level={skill.level} />
      <Stack>
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
      </Stack>
      <ListItemText primary={skill.description} />
    </ListItem>
  );
};
