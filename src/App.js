import { useState } from "react";
import NavBar from "./components/Nav";
import Board from "./components/Board";
import StartScreen from "./components/StartScreen";
import { useGame } from "./context/GameContext";

function App() {
  const { gameStarted, playerName, resetGame, backToMain, resetFlag } =
    useGame();
  const [gameEnded, setGameEnded] = useState(false);

  const handleGameEnd = () => {
    if (!gameEnded) setGameEnded(true);
  };

  return (
    <>
      {gameStarted ? (
        <>
          <NavBar gameEnded={gameEnded} />
          <Board key={resetFlag} onGameEnd={handleGameEnd} />

          {gameEnded && (
            <div className="win-overlay">
              <div className="win-box">
                🎉 Congratulations {playerName}! You Won! 🎉
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "15px" }}
                >
                  <button
                    onClick={() => {
                      setGameEnded(false);
                      resetGame();
                    }}
                  >
                    Play Again
                  </button>
                  <button
                    onClick={() => {
                      setGameEnded(false);
                      backToMain();
                    }}
                  >
                    Back to Main
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <StartScreen />
      )}
    </>
  );
}

export default App;
