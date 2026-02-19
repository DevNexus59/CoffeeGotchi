import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GameOverScreen from "./src/screens/GameOverScreen";
import GameScreen from "./src/screens/GameScreen";
import WinnerScreen from "./src/screens/WinnerScreen";
import Loader from "./src/screens/Loader";
import AnimalAvatar from "./src/components/AnimalAvatar";

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	// Attention à cette ligne 👇
	const [gameState, setGameState] = useState<
		"win" | "coffee_over" | "tea_over" | "playing"
	>("playing");

	// 1. On regroupe toute la logique d'affichage ici
	const renderGameContent = () => {
		if (gameState === "playing") {
			return <GameScreen onGameOver={setGameState} />;
		}
		if (gameState === "win") {
			return <WinnerScreen reason="win" />;
		}
		if (gameState === "coffee_over") {
			return <GameOverScreen reason="coffee_over" />;
		}
		if (gameState === "tea_over") {
			return <GameOverScreen reason="tea_over" />;
		}
	};

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			{isLoading ? (
				<Loader onFinished={() => setIsLoading(false)} />
			) : (
				renderGameContent()
			)}
		</View>
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

  gameContent: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF5E1",
  },
});
