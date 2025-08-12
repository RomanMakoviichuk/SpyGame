import React, { useState } from "react";
import './GameSetup.css';

export default function GameSetup({
                                      players,
                                      setPlayers,
                                      spiesCount,
                                      setSpiesCount,
                                      onNext,
                                  }) {
    const [playerName, setPlayerName] = useState("");

    const addPlayer = () => {
        if (playerName.trim() && !players.includes(playerName.trim())) {
            setPlayers([...players, playerName.trim()]);
            setPlayerName("");
        }
    };

    const removePlayer = (name) => {
        setPlayers(players.filter((p) => p !== name));
    };

    return (
        <div>
            <h2>Додайте гравців</h2>
            <input
                type="text"
                placeholder="Ім'я гравця"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addPlayer()}
            />
            <button onClick={addPlayer}>Додати гравця</button>
            <ul>
                {players.map((p) => (
                    <li className="player-item" key={p}
                        style={{fontSize: "35px", alignItems:"center"}}>
                        {p}{" "}
                        <button
                            onClick={() => removePlayer(p)}
                        >
                            Х
                        </button>
                    </li>
                ))}
            </ul>

            <label>
                Кількість шпигунів:
                <select
                    value={spiesCount}
                    onChange={(e) => setSpiesCount(Number(e.target.value))}
                >
                    <option value={1}>1 шпигун</option>
                    <option value={2} disabled={players.length < 3}>2 шпигуна</option>
                    <option value={3} disabled={players.length < 4}>3 шпигуна</option>
                </select>
            </label>
            <br/>
            <button
                onClick={() => players.length > 1 && spiesCount < players.length && onNext()}
                disabled={players.length < 2 || spiesCount >= players.length}
            >
                Далі
            </button>
        </div>
    );
}
