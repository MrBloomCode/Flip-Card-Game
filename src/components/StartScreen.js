import { useState } from "react";
import { useGame } from "../context/GameContext";
import "./style.css";

export default function StartScreen() {
  const { setPlayerName, setDifficulty, setGameStarted } = useGame();
  const [name, setName] = useState("");
  const [level, setLevel] = useState("easy");

  const handleStart = () => {
    if (!name.trim()) return alert("Name Required");
    setPlayerName(name.trim());
    setDifficulty(level);
    setGameStarted(true);
  };

  return (
    <div className="start-screen">
      <div className="start-box">
        <h1 className="title">🎮 Flip Game</h1>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="select"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={handleStart} className="start-button">
          Start Game
        </button>
      </div>
    </div>
  );
}
