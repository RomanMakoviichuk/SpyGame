import React, { useState, useEffect } from "react";
import StartMenu from "./pages/StartMenu.jsx";
import GameSetup from "./pages/GameSetup.jsx";
import CategorySelect from "./pages/CategorySelect.jsx";
import GameScreen from "./pages/GameScreen.jsx";
import AppLayout from "./components/AppLayout.jsx";

const STORAGE_KEY = "spyGameData";

export default function App() {
    const [step, setStep] = useState(0); // 0=menu,1=setup,2=categories,3=game
    const [players, setPlayers] = useState([]);
    const [spiesCount, setSpiesCount] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [gameData, setGameData] = useState(null);

    // Завантаження з localStorage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            setPlayers(parsed.players || []);
            setSpiesCount(parsed.spiesCount || 1);
            setSelectedCategories(parsed.selectedCategories || []);
        }
    }, []);

    // Збереження в localStorage
    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ players, spiesCount, selectedCategories })
        );
    }, [players, spiesCount, selectedCategories]);

    const resetGame = () => {
        setGameData(null);
        setStep(1);
    };

    let content;
    if (step === 0)
        content = (
            <StartMenu onNewGame={() => setStep(1)} onExit={() => alert("Гру завершено")} />
        );
    else if (step === 1)
        content = (
            <GameSetup
                players={players}
                setPlayers={setPlayers}
                spiesCount={spiesCount}
                setSpiesCount={setSpiesCount}
                onNext={() => setStep(2)}
            />
        );
    else if (step === 2)
        content = (
            <CategorySelect
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                onStart={(data) => {
                    setGameData(data);
                    setStep(3);
                }}
                players={players}
                spiesCount={spiesCount}
            />
        );
    else if (step === 3)
        content = (
            <GameScreen gameData={gameData} onPlayAgain={resetGame} onExit={() => setStep(0)} />
        );

    return <AppLayout>{content}</AppLayout>;
}
