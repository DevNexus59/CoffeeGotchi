import { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
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
	const player = useAudioPlayer(
		require("../assets/sounds/bitstream-sprint.mp3"),
	);
	// 1. Nos états
	const [energy, setEnergy] = useState<number>(50);
	const [timeLeft, setTimeLeft] = useState<number>(60);
    const clickSoundTea = useAudioPlayer(
					require("../assets/sounds/click_for_tea.mp3"),
				);
    const clickSoundCoffee = useAudioPlayer(
					require("../assets/sounds/click_for_coffe.mp3"),
				);
	// 2. Le chronomètre (Le "Cœur" du jeu)
				useEffect(() => {
					const timer = setInterval(() => {
						// --- Énergie Aléatoire ---
						setEnergy((prev) => {
							// Génère une perte entre 1 et 6 points d'énergie
							const randomLoss = Math.floor(Math.random() * 6) + 1;
							return Math.max(prev - randomLoss, 0);
						});

						// --- Temps Classique ---
						setTimeLeft((prev) => Math.max(prev - 1, 0));
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
		<View style={styles.container}>
			{/* Header : Jauge d'énergie */}
			<View style={styles.header}>
				<Text>Temps restant : {timeLeft}s</Text>
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
					onPress={() => {
						setEnergy(applyRemedy(energy, "coffee"));
						clickSoundCoffee.seekTo(0); // Revenir au début du son pour pouvoir le rejouer rapidement
						clickSoundCoffee.play();
					}}
				/>
				<RemedyButton
					type="herbal-tea"
					onPress={() => {
						setEnergy(applyRemedy(energy, "herbal-tea"));
						clickSoundTea.seekTo(0); // Revenir au début du son pour pouvoir le rejouer rapidement
						clickSoundTea.play();
					}}
				/>
			</View>
		</View>
	);
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
