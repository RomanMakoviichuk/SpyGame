import React, { useState, useEffect } from "react";
import categoriesData from "../data/categories.js";
import './CategorySelect.css'

export default function CategorySelect({
                                           selectedCategories,
                                           setSelectedCategories,
                                           onStart,
                                           players,
                                           spiesCount,
                                       }) {
    const [currentSelection, setCurrentSelection] = useState(selectedCategories);

    const toggleCategory = (cat) => {
        if (currentSelection.includes(cat)) {
            setCurrentSelection(currentSelection.filter((c) => c !== cat));
        } else {
            setCurrentSelection([...currentSelection, cat]);
        }
    };

    useEffect(() => {
        setSelectedCategories(currentSelection);
    }, [currentSelection]);

    const handleStart = () => {
        if (currentSelection.length === 0) {
            alert("Будь ласка, оберіть хоча б одну категорію.");
            return;
        }

        // Випадково вибираємо категорію із обраних
        const randomCategory =
            currentSelection[Math.floor(Math.random() * currentSelection.length)];

        // Вибираємо випадкове слово саме з цієї категорії
        const randomWordList = categoriesData[randomCategory];
        const randomWord =
            randomWordList[Math.floor(Math.random() * randomWordList.length)];

        // Перемішуємо гравців
        const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);

        // Вибираємо шпигунів
        const spiesSet = new Set();
        while (spiesSet.size < spiesCount) {
            spiesSet.add(Math.floor(Math.random() * players.length));
        }

        // Формуємо ролі
        const roles = shuffledPlayers.map((player, idx) => {
            if (spiesSet.has(idx)) {
                // список союзників-шпигунів
                const allies = shuffledPlayers
                    .filter((_, i) => spiesSet.has(i) && i !== idx);
                return {
                    player,
                    role: "spy",
                    word: null,
                    category: randomCategory,
                    allies
                };
            }
            return {
                player,
                role: "player",
                word: randomWord,
                category: randomCategory,
                allies: []
            };
        });

        onStart({ roles, category: randomCategory });
    };

    return (
        <div>
            <h2>Оберіть категорії</h2>
            <div className="category-list">
                {Object.keys(categoriesData).map((cat) => (
                    <label key={cat}>
                        <input
                            type="checkbox"
                            checked={currentSelection.includes(cat)}
                            onChange={() => toggleCategory(cat)}
                        />
                        {cat}
                    </label>
                ))}
            </div>
            <button onClick={handleStart}>Почати гру</button>
        </div>
    );
}
