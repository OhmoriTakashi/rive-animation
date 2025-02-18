import { useState, useMemo, useRef } from "react";
import {
  TextField,
  Menu,
  MenuItem,
  Typography,
  ClickAwayListener,
} from "@mui/material";
import type { Skill } from "../types/types";

type Props = {
  skills: Skill[];
  selectedSkills: Skill[];
  visibleSkills: Skill[]; // チップ表示中のスキル（検索結果に出さない）
  onSelect: (skill: Skill, level: number) => void;
};

export const SkillSearch = ({
  skills,
  selectedSkills,
  visibleSkills,
  onSelect,
}: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 検索対象スキルリスト（選択済み & チップ表示中のスキルを除外）
  const availableSkills = useMemo(() => {
    return skills.filter(
      (skill) =>
        !selectedSkills.some((s) => s.id === skill.id) &&
        !visibleSkills.some((s) => s.id === skill.id)
    );
  }, [skills, selectedSkills, visibleSkills]);

  // 部分一致検索結果（最大10件に制限）
  const filteredSkills = useMemo(() => {
    return searchQuery
      ? availableSkills
          .filter((skill) =>
            skill.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 10) // 最大10件まで表示
      : [];
  }, [searchQuery, availableSkills]);

  const handleOpen = () => {
    setMenuOpen(true);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (
      inputRef.current &&
      event.target instanceof Node &&
      inputRef.current.contains(event.target)
    ) {
      return; // `TextField` 内のクリックなら閉じない
    }
    setMenuOpen(false);
  };

  const handleSelectSkill = (skill: Skill) => {
    onSelect(skill, 1);
    setSearchQuery("");
    setMenuOpen(false);
  };

  return (
    <div>
      <TextField
        label="スキルを検索"
        variant="outlined"
        fullWidth
        size="small"
        inputRef={inputRef}
        value={searchQuery}
        onClick={handleOpen} // クリックでメニューを開く
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleOpen();
        }}
        style={{ margin: "8px 0" }}
      />

      <Menu
        anchorEl={inputRef.current}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        keepMounted
        disableAutoFocus
        disableEnforceFocus
        PaperProps={{
          style: {
            width: inputRef.current?.clientWidth || "auto",
          },
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            {searchQuery.length === 0 ? (
              <MenuItem disabled>
                <Typography variant="body2">検索してください</Typography>
              </MenuItem>
            ) : filteredSkills.length > 0 ? (
              filteredSkills.map((skill) => (
                <MenuItem
                  key={skill.id}
                  onClick={() => handleSelectSkill(skill)}
                >
                  {skill.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>
                <Typography variant="body2">
                  一致するスキルがありません
                </Typography>
              </MenuItem>
            )}
          </div>
        </ClickAwayListener>
      </Menu>
    </div>
  );
};
