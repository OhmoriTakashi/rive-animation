import { FC } from "react";
import { Level1Icon } from "../assets/Level1Image";
import { Level2Icon } from "../assets/Level2Image";
import { Level3Icon } from "../assets/Level3Image";

type Props = {
  level: number;
};

export const SkillLevelIcon: FC<Props> = ({ level }) => {
  switch (level) {
    case 1:
      return <Level1Icon size={100} />;
    case 2:
      return <Level2Icon size={100} />;
    case 3:
      return <Level3Icon size={100} />;
    default:
      return null;
  }
};
