import { useState, useEffect } from "react";
import { ImageBackground, View, StyleSheet} from "react-native";
import StatGauge from "../components/StatGauge";
import { useAudioPlayer } from "expo-audio";
import AnimalAvatar from "../components/AnimalAvatar";
import { getAnimalState, applyRemedy } from "../../utils/gameLogic";
import type { AnimalType } from "../types/game";
import RemedyButton from "../components/RemedyButton";
import "../assets/images/backgrounds/background0.jpg";

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
			setEnergy((prev) => Math.min(prev - 1, 100)); // Gain d'énergie chaque seconde
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
			source={require("../assets/images/backgrounds/background0.jpg")}
			style={styles.container}
		>
			{/* Header : Jauge d'énergie */}
			<View style={styles.header}>
				<StatGauge value={energy} />
			</View>

			{/* Corps : Personnage centré */}
			<View style={styles.characterContainer}>
				<AnimalAvatar animal={animal} state={getAnimalState(energy)} />
			</View>

			{/* Footer : Boutons d'actions */}
			<View style={styles.footer}>
				<RemedyButton
					type="coffee"
					onPress={() => setEnergy(applyRemedy(energy, "coffee"))}
				/>
				<RemedyButton
					type="herbal-tea"
					onPress={() => setEnergy(applyRemedy(energy, "herbal-tea"))}
				/>
			</View>
		</ImageBackground>
	);
<<<<<<< HEAD
}
=======
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center", // Centre verticalement le contenu principal
		alignItems: "center", // Centre horizontalement
	},
	header: {
		position: "absolute",
		top: 60, // Ajusté pour ne pas coller à l'encoche (Notch)
		alignItems: "center",
		width: "100%",
	},
	characterContainer: {
		// L'avatar se placera naturellement au milieu grâce au flex:1 du parent
		justifyContent: "center",
		alignItems: "center",
	},
	footer: {
		position: "absolute",
		bottom: 40,
		flexDirection: "row",
		justifyContent: "center",
		gap: 30, // Espace entre les boutons
		width: "100%",
		paddingHorizontal: 20,
	},
});
>>>>>>> dev
