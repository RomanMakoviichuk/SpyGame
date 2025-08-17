import React, { useState } from "react";
import './GameScreen.css';

export default function GameScreen({ gameData, onPlayAgain, onExit }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showRole, setShowRole] = useState(false);
    const [roundStarted, setRoundStarted] = useState(false);

    if (!gameData) return null;

    const current = gameData.roles[currentIndex];

    const handleTap = () => {
        if (roundStarted) return;

        if (!showRole) {
            setShowRole(true);
        } else {
            setShowRole(false);
            if (currentIndex + 1 < gameData.roles.length) {
                setCurrentIndex(currentIndex + 1);
            } else {
                setRoundStarted(true);
            }
        }
    };

    return (
        <div
            className="gameScreen"
            onClick={handleTap}
            style={{ userSelect: "none", cursor: roundStarted ? "default" : "pointer" }}
        >
            {!roundStarted && (
                <>
                    <h2>Хід гри</h2>
                    <p>
                        Поточний гравець: <b>{current.player}</b>
                    </p>

                    {!showRole && <p>Торкніться екрану, щоб побачити слово!</p>}

                    {showRole && (
                        <>
                            {current.role === "spy" ? (
                                <>
                                    <p style={{ color: "red", fontWeight: "bold" }}>
                                        🕵️ Ти шпигун!
                                    </p>
                                    <p>Категорія: {gameData.category}</p>
                                    {current.allies && current.allies.length > 0 && (
                                        <p>
                                            Інші шпигуни:{" "}
                                            <b>{current.allies.join(", ")}</b>
                                        </p>
                                    )}
                                </>
                            ) : (
                                <>
                                    <p>
                                        ✅ Слово: <b>{current.word}</b>
                                    </p>
                                    <p>Категорія: {gameData.category}</p>
                                </>
                            )}
                            <p>(Торкніться екрану, щоб перейти до наступного гравця)</p>
                        </>
                    )}
                </>
            )}

            {roundStarted && (
                <>
                    <h2>Раунд почався</h2>
                    <div>
                        <button onClick={onPlayAgain}>Зіграти ще</button>
                        <button onClick={onExit}>Вийти в головне меню</button>
                    </div>
                </>
            )}
        </div>
    );
}
