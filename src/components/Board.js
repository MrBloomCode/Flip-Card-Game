import { useState, useEffect } from "react";
import Images from "./Card";
import { useGame } from "../context/GameContext";
import "./style.css";

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default function Board({ onGameEnd }) {
  const { difficulty, resetFlag } = useGame();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);

  let cols = 4,
    rows = 3,
    pairs = 6;
  if (difficulty === "medium") {
    cols = 4;
    rows = 4;
    pairs = 8;
  } else if (difficulty === "hard") {
    cols = 6;
    rows = 4;
    pairs = 12;
  }

  useEffect(() => {
    const selectedImages = Images.slice(0, pairs);
    const duplicatedImages = selectedImages.flatMap((img) => [
      { ...img, uniqueId: `${img.id}-${Math.random()}` },
      { ...img, uniqueId: `${img.id}-${Math.random()}` },
    ]);
    const shuffled = shuffleArray(duplicatedImages);
    setCards(shuffled);
    setMatchedCards([]);
    setFlippedCards([]);
    setLockBoard(false);
  }, [pairs, difficulty, resetFlag]);

  useEffect(() => {
    if (matchedCards.length === pairs) {
      setTimeout(() => onGameEnd(), 300);
    }
  }, [matchedCards, pairs, onGameEnd]);

  const handleFlip = (card) => {
    if (lockBoard) return;
    if (matchedCards.includes(card.id)) return;

    const isAlreadyFlipped = flippedCards.find(
      (c) => c.uniqueId === card.uniqueId
    );
    if (isAlreadyFlipped) {
      setFlippedCards(flippedCards.filter((c) => c.uniqueId !== card.uniqueId));
      return;
    }

    if (flippedCards.length === 2) return;

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setLockBoard(true);
      const [first, second] = newFlipped;

      if (first.id === second.id) {
        setMatchedCards((prev) => [...prev, first.id]);
        setTimeout(() => {
          setFlippedCards([]);
          setLockBoard(false);
        }, 400);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setLockBoard(false);
        }, 400);
      }
    }
  };

  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(70px, 0fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(90px, auto))`,
      }}
    >
      {cards.map((card) => {
        const isFlipped =
          flippedCards.find((c) => c.uniqueId === card.uniqueId) ||
          matchedCards.includes(card.id);

        return (
          <div
            key={card.uniqueId}
            className="card"
            onClick={() => handleFlip(card)}
          >
            <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
              <div className="card-front"></div>
              <div className="card-back">
                <img
                  src={require(`../assets/images/${card.src}`)}
                  alt={`card-${card.id}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
