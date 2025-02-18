import { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { SkillSelector } from "./SkillSelector";
import { SkillSearch } from "./SkillSearch";
import { SelectedSkillList } from "./SelectedSkillList";
import skillsData from "../mockdata/skillMockData.json";
import type { Skill, SelectedSkill } from "../types/types";
import { postSkills } from "../api/api";

const DefaultPosessesSkill: SelectedSkill[] = [
  {
    id: 0,
    name: "Prototyping",
    description:
      "figmaなどを用いて検証用のMVPを素早く作成し、最小限のコストで検証ができる",
    level: 1,
  },
  {
    id: 1,
    name: "Materal Design",
    description:
      "Materal Designを理解し、プロダクトデザインに導入することができる",
    level: 2,
  },
];

export const SkillForm = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] =
    useState<SelectedSkill[]>(DefaultPosessesSkill);
  const [visibleSkills, setVisibleSkills] = useState<Skill[]>([]);
  const [defaultLevel, setDefaultLevel] = useState<number>(1);

  useEffect(() => {
    setSkills(skillsData);
    setVisibleSkills(skillsData.slice(0, 10)); // **デフォルトで最初の10件をチップに表示**
  }, []);

  const handleSelectSkill = (skill: Skill) => {
    setSelectedSkills((prev) => [
      {
        id: skill.id,
        name: skill.name,
        description: skill.description,
        level: defaultLevel,
      },
      ...prev,
    ]);
    setVisibleSkills((prev) => prev.filter((s) => s.id !== skill.id)); // チップから削除
  };
  const handleLevelChange = (id: number, level: number) => {
    setSelectedSkills((prev) =>
      prev.map((skill) => (skill.id === id ? { ...skill, level } : skill))
    );
  };

  const handleRemoveSkill = (id: number) => {
    setSelectedSkills((prev) => prev.filter((skill) => skill.id !== id));
  };

  const handlePost = async () => {
    const data = selectedSkills.map(({ id, level }) => ({ id, level }));
    try {
      await postSkills(data);
      alert("スキル情報を送信しました");
    } catch (error) {
      console.error("送信エラー", error);
    }
  };

  return (
    <Stack
      spacing={3}
      sx={{
        width: "100%",
        height: "100%",
        maxWidth: 1440,
        m: "auto",
        p: 3,
      }}
    >
      <Stack
        spacing={3}
        direction={"row"}
        sx={{ height: "calc(100vh - 144px)" }}
      >
        <Box
          sx={{
            width: "480px",
            height: "100%",
            padding: 3,
            bgcolor: "white",
            borderRadius: 6,
            border: "1px solid #020A10",
            boxShadow: "4px 4px 0px rgba(64, 64, 66, 0.8)",
          }}
        >
          <Typography variant="h6">スキルの追加</Typography>
          <SkillSearch
            skills={skills}
            selectedSkills={selectedSkills}
            visibleSkills={visibleSkills}
            onSelect={handleSelectSkill}
          />
          <SkillSelector
            visibleSkills={visibleSkills}
            selectedSkills={selectedSkills}
            onSelect={handleSelectSkill}
          />
          <Select
            sx={{
              width: "120px",
              height: "40px",
            }}
            value={defaultLevel}
            onChange={(e) => setDefaultLevel(Number(e.target.value))}
            aria-label="選択肢"
          >
            <MenuItem value={1}>初級</MenuItem>
            <MenuItem value={2}>中級</MenuItem>
            <MenuItem value={3}>上級</MenuItem>
          </Select>
        </Box>
        <SelectedSkillList
          selectedSkills={selectedSkills}
          onLevelChange={handleLevelChange}
          onRemove={handleRemoveSkill}
        />
      </Stack>
      <Box
        sx={{
          width: "100%",
          height: "72px",
          borderRadius: 6,
          bgcolor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          border: "1px solid #020A10",
          boxShadow: "4px 4px 0px rgba(64, 64, 66, 0.8)",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          size="large"
          sx={{ borderRadius: "24px" }}
        >
          戻る
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePost}
          size="large"
          sx={{ borderRadius: "24px", boxShadow: "none" }}
        >
          スキルを送信
        </Button>
      </Box>
    </Stack>
  );
};
