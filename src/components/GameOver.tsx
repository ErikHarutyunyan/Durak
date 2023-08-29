import React, { useEffect } from "react";

interface IGameOverProps {
  isShow: boolean;
  isMyWin: boolean;
  onRestartGame: (flag: boolean) => void;
}

const GameOver: React.FC<IGameOverProps> = ({
  isShow,
  isMyWin,
  onRestartGame,
}) => {
  useEffect(() => {
    isMyWin
      ? document.documentElement.style.setProperty("--color", "#6eff3e")
      : document.documentElement.style.setProperty("--color", "#ff1818");
  }, [isMyWin]);

  return isShow ? (
    <div className="game-over">
      <b className={isMyWin ? "win" : "lose"}>
        {isMyWin ? "Congratulations! You win!" : "Alas! You lose!"}
      </b>
      <button className="game-over-btn" onClick={() => onRestartGame(true)}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Play Again
      </button>
    </div>
  ) : null;
};

export default GameOver;
