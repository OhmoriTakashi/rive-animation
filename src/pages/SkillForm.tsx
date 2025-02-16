import { useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import { SkillSelector } from "../components/SkillSelector";
import { SkillSearch } from "../components/SkillSearch";
import { SelectedSkillList } from "../components/SelectedSkillList";
import skillsData from "../mockdata/skillMockData.json";
import type { Skill, SelectedSkill } from "../types/types";
import { Select, MenuItem, Button } from "@mui/material";
import { postSkills } from "../api/api";

const DefaultPosessesSkill: SelectedSkill[] = [
  { id: 0, name: "React", description: "Frontend framework", level: 1 },
  { id: 1, name: "TypeScript", description: "Typed JavaScript", level: 2 },
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
      ...prev,
      {
        id: skill.id,
        name: skill.name,
        description: skill.description,
        level: defaultLevel,
      },
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
    <Paper elevation={3} style={{ padding: 16, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h6">スキル選択</Typography>
      <Select
        value={defaultLevel}
        onChange={(e) => setDefaultLevel(Number(e.target.value))}
        fullWidth
      >
        <MenuItem value={1}>初級</MenuItem>
        <MenuItem value={2}>中級</MenuItem>
        <MenuItem value={3}>上級</MenuItem>
      </Select>
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
      <SelectedSkillList
        selectedSkills={selectedSkills}
        onLevelChange={handleLevelChange}
        onRemove={handleRemoveSkill}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handlePost}
        style={{ marginTop: 16 }}
      >
        スキルを送信
      </Button>
    </Paper>
  );
};
