import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GameOverScreen from "./src/screens/GameOverScreen";
import Loader from "./src/screens/Loader";
import AnimalAvatar from "./src/components/AnimalAvatar";

export default function App() {
  //Création d'un état pour savoir si on affiche le loader ou autre page
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoading ? (
        <Loader onFinished={() => setIsLoading(false)} />
      ) : (
        // Remplacer ce bloc ensuite
        // par le SelectionScreen
        <View style={styles.gameContent}>
          <Text>CoffeeGotchi</Text>
        </View>
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
