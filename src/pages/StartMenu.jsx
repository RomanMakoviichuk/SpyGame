import React from "react";
import './StartMenu.css';

export default function StartMenu({ onNewGame, onExit }) {
    const openFullscreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(() => {}); // на випадок помилки
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    };

    const handleNewGame = () => {
        openFullscreen();
        onNewGame();
    };

    return (
        <div className="start-menu">
            <h1>Гра «Шпигун»</h1>
            <button onClick={handleNewGame}>Створити нову гру</button>
            <button onClick={onExit}>Вийти з гри</button>
        </div>
    );
}

