import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground } from "react-native";
import { useState } from "react";
import GameOverScreen from "./src/screens/GameOverScreen";
import GameScreen from "./src/screens/GameScreen";
import Loader from "./src/screens/Loader";
import SelectionScreen from "./src/screens/SelectionScreen";
import type { AnimalType } from "./src/types/game";

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [selectedAnimal, setSelectedAnimal] = useState<AnimalType | null>(null);
	const [gameState, setGameState] = useState<
		"win" | "coffee_over" | "tea_over" | "playing"
	>("playing");

	// 2. La logique pour les écrans de jeu
	const renderGameContent = () => {
    if (!selectedAnimal) {
					return null;
				}

				if (gameState === "playing") {
					return (
						<GameScreen animal={selectedAnimal} onGameOver={setGameState} />
					);
				}
				// if (gameState === "win") {
				// 	return <WinnerScreen reason="win" />;
				// }
				if (gameState === "coffee_over") {
					return <GameOverScreen state={setGameState} reason="coffee_over" />;
				}
				if (gameState === "tea_over") {
					return <GameOverScreen state={setGameState} reason="tea_over" />;
				}
	};

	return (
		<ImageBackground
			source={require("./src/assets/background.jpg")}
			style={styles.container}
			resizeMode="cover"
		>
			<StatusBar style="auto" />
			{isLoading ? (
				<Loader onFinished={() => setIsLoading(false)} />
			) : selectedAnimal === null ? (
				<SelectionScreen onSelect={setSelectedAnimal} />
			) : (
				renderGameContent()
			)}
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});