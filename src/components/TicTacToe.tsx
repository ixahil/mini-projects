import { useEffect, useState } from "react";
import Board from "./Board";
import GameOver from "./GamOver";
import GameState from "./GameState";
import Reset from "./Reset";

import gameOverSoundAsset from "../assets/sounds/gameover.wav";
import clickSoundAsset from "../assets/sounds/click.wav";

type ClickSoundType = HTMLAudioElement;
type GameOverSoundType = HTMLAudioElement;

const gameOverSound: GameOverSoundType = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;

const clickSound: ClickSoundType = new Audio(clickSoundAsset);
clickSound.volume = 0.5;

const PLAYER_X = "x";
const PLAYER_O = "o";

const TicTacToe = () => {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState("");
  const [gameState, setGameState] = useState(GameState.inProgress);

  const winningCombinations = [
    //Rows
    { combo: [0, 1, 2], strikeClass: "strike-row-1" },
    { combo: [3, 4, 5], strikeClass: "strike-row-2" },
    { combo: [6, 7, 8], strikeClass: "strike-row-3" },

    //Columns
    { combo: [0, 3, 6], strikeClass: "strike-col-1" },
    { combo: [1, 4, 7], strikeClass: "strike-col-2" },
    { combo: [2, 5, 8], strikeClass: "strike-col-3" },

    //Diagonals
    { combo: [0, 4, 8], strikeClass: "strike-diag-1" },
    { combo: [2, 4, 6], strikeClass: "strike-diag-2" },
  ];

  const checkWinner = (tiles: any, setStrikeClass: any, setGameState: any) => {
    for (const { combo, strikeClass } of winningCombinations) {
      const tileValue1 = tiles[combo[0]];
      const tileValue2 = tiles[combo[1]];
      const tileValue3 = tiles[combo[2]];

      if (
        tileValue1 !== null &&
        tileValue1 === tileValue2 &&
        tileValue1 === tileValue3
      ) {
        setStrikeClass(strikeClass);
        if (tileValue1 === PLAYER_X) setGameState(GameState.playerXWins);
        else setGameState(GameState.playerOWins);
        return;
      }
    }

    const areAllTilesFilledIn = tiles.every((tile: any) => tile !== null);
    if (areAllTilesFilledIn) setGameState(GameState.draw);
  };

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  const handleTileClick = (index: number) => {
    if (gameState !== GameState.inProgress) {
      return;
    }
    if (tiles[index] !== null) return;

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    if (playerTurn === PLAYER_X) setPlayerTurn(PLAYER_O);
    else setPlayerTurn(PLAYER_X);
  };

  useEffect(() => {
    if (tiles.some((tile) => tile !== null)) clickSound.play();
  }, [tiles]);

  useEffect(() => {
    if (gameState !== GameState.inProgress) gameOverSound.play();
  }, [gameState]);

  const handleReset = () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeClass("");
  };

  return (
    <>
      <h1>TicTacToe</h1>
      <Board
        tiles={tiles}
        onTileClick={handleTileClick}
        playerTurn={playerTurn}
        strikeClass={strikeClass}
      />
      <GameOver gameState={gameState} />
      <Reset gameState={gameState} onReset={handleReset} />
      <p className="footer">Developed with &lt;3 by SahilDev | www.sahildev.pro</p>
    </>
  );
};

export default TicTacToe;
