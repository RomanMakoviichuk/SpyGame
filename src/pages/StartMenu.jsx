import React from "react";
import './StartMenu.css';

export default function StartMenu({ onNewGame, onExit }) {
    return (
        <div className="startMenu">
            <h1>Гра <span>«Шпигун»</span></h1>
            <button className="main_btn" onClick={onNewGame}>Створити нову гру</button>
            <button onClick={onExit}>Вийти з гри</button>
        </div>
    );
}
