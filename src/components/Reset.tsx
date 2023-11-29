import { MouseEventHandler } from "react";
import GameState from "./GameState";

type Props = {
  gameState: Number;
  onReset: MouseEventHandler;
};

function Reset({ gameState, onReset }: Props) {
  if (gameState === GameState.inProgress) return;
  return (
    <button onClick={onReset} className="reset-btn">
      Reset
    </button>
  );
}

export default Reset;
