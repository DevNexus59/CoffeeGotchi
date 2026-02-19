import { useState, useEffect } from "react";
import { ImageBackground } from "react-native";
import RemedyButtons from "../components/RemedyButtons";
import StatGauge from "../components/StatGauge";
import { useAudioPlayer } from "expo-audio";
import AnimalAvatar from "../components/AnimalAvatar";
import { getAnimalState } from "../../utils/gameLogic";
import type { AnimalType } from "../types/game";

interface GameScreenProps {
    animal: AnimalType;
    onGameOver: (reason: "win" | "coffee_over" | "tea_over") => void;
}

export default function GameScreen({ animal, onGameOver }: GameScreenProps) {
	const player = useAudioPlayer(require("../assets/sounds/game_over.mp3"));
	// 1. Nos états
	const [energy, setEnergy] = useState<number>(50);
	const [timeLeft, setTimeLeft] = useState<number>(60);

	// 2. Le chronomètre (Le "Cœur" du jeu)
	useEffect(() => {
		const timer = setInterval(() => {
			setEnergy((prev) => Math.min(prev + 1, 100)); // Gain d'énergie chaque seconde
			setTimeLeft((prev) => Math.max(prev - 1, 0)); // Réduction du temps
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		// Condition de défaite globale (Avant)
		if (energy <= 0) {
			onGameOver("coffee_over");
		} else if (energy >= 100) {
			onGameOver("tea_over");
		}

		if (timeLeft === 0) {
			onGameOver("win");
		}
	}, [energy, timeLeft, onGameOver]);
	useEffect(() => {
		player.play();
	}, [player.play]);
	return (
		<ImageBackground
			source={require("../assets/backgrounds/background0.png")}
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<StatGauge value={energy}/>
			<AnimalAvatar animal={animal} state={getAnimalState(energy)} />
			<RemedyButtons energy={energy} setEnergy={setEnergy} />
		</ImageBackground>
	);
}
