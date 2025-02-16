// import { useStateMachineInput, useRive } from "@rive-app/react-canvas";
import { SkillForm } from "./pages/SkillForm";

export default function RatingAnimation() {
  // // 状態マシンの名前とトリガー入力名
  // const STATE_MACHINE_NAME = "State Machine 1";
  // const TRIGGER_NAME = "playTrigger";

  // // Rive アニメーションのセットアップ
  // const { RiveComponent, rive } = useRive({
  //   src: "jonathan4.riv", // Rive ファイルのパス
  //   stateMachines: [STATE_MACHINE_NAME], // 状態マシン名を指定
  //   autoplay: true, // Idle のアニメーションを自動再生
  // });

  // // トリガー入力を取得
  // const playTrigger = useStateMachineInput(
  //   rive,
  //   STATE_MACHINE_NAME,
  //   TRIGGER_NAME
  // );

  // // ボタンを押すとトリガーを発動してアニメーションを再生
  // const handlePlayAnimation = () => {
  //   if (playTrigger) {
  //     playTrigger.fire(); // トリガーを発動
  //   }
  // };

  return (
    <div>
      <SkillForm />
    </div>
  );
}
