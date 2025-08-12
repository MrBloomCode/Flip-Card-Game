import "./style.css";
import { useGame } from "../context/GameContext";
import { useEffect, useState } from "react";

function NavBar({ gameEnded }) {
  const { playerName, difficulty, resetFlag } = useGame();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(0);
  }, [resetFlag]);

  useEffect(() => {
    if (gameEnded) return;
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameEnded]);

  const getDifficultyLabel = (level) => {
    if (level === "easy") return "Easy";
    if (level === "medium") return "Medium";
    if (level === "hard") return "Hard";
    return "";
  };

  return (
    <nav className="nav">
      <ul>
        <li className="title">
          <a href="/">Flip Game</a>
        </li>
        <li>⏱️ {seconds} Seconds</li>
        <li>
          🎮 {playerName} | 🎯 Difficulty: {getDifficultyLabel(difficulty)}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
