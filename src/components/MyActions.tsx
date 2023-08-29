import * as React from "react";
import { battleField } from "../store";
import { audioStore } from "../store/AudioStore";

interface IMyActionsProps {
  isMyAttack: boolean;
  onRepulsed: () => void;
  onGetCard: () => void;
  battleField: any;
}

const MyActions: React.FC<IMyActionsProps> = ({
  isMyAttack,
  onRepulsed,
  onGetCard,
}) => {
  const classes = ["btn-actions"];
  if (!isMyAttack) {
    classes.push("red-btn");
  }
  // handlePlayClick();
  const handlePlayClick = (name: string) => {
    audioStore.playAudio(name);
  };
  if (battleField.cards.my.length === 0 && battleField.cards.his.length === 0)
    return null;
  return (
    <button
      className={classes.join(" ")}
      onClick={() => {
        if (isMyAttack) {
          onRepulsed();
          handlePlayClick("dump");
        } else {
          onGetCard();
          handlePlayClick("tink");
        }
      }}
    >
      {isMyAttack ? "dump " : "Take"}
    </button>
  );
};

export default MyActions;
