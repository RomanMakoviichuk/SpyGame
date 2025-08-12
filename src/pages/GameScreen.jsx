import React, { useState } from "react";
import './GameScreen.css';

export default function GameScreen({ gameData, onPlayAgain, onExit }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showRole, setShowRole] = useState(false);
    const [roundStarted, setRoundStarted] = useState(false); // новий стан

    if (!gameData) return null;

    const current = gameData.roles[currentIndex];

    const handleTap = () => {
        if (roundStarted) return; // якщо раунд почався, тап не змінює стан

        if (!showRole) {
            setShowRole(true);
        } else {
            setShowRole(false);
            if (currentIndex + 1 < gameData.roles.length) {
                setCurrentIndex(currentIndex + 1);
            } else {
                // Останній гравець завершив перегляд
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
                                        Ти шпигун!
                                    </p>
                                    <p>Категорія: {gameData.category}</p>
                                </>
                            ) : (
                                <p>
                                    Слово: <b>{current.word}</b>
                                </p>
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
