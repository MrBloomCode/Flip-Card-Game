import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [playerName, setPlayerName] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [gameStarted, setGameStarted] = useState(false);
  const [resetFlag, setResetFlag] = useState(false);

  const resetGame = () => {
    setResetFlag((prev) => !prev);
  };

  const backToMain = () => {
    setGameStarted(false);
    setPlayerName("");
  };

  return (
    <GameContext.Provider
      value={{
        playerName,
        setPlayerName,
        difficulty,
        setDifficulty,
        gameStarted,
        setGameStarted,
        resetFlag,
        setResetFlag,
        resetGame,
        backToMain,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
