import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import AnimalAvatar from "./src/components/AnimalAvatar";
import SelectionScreen from './src/screens/SelectionScreen';
import { useState } from "react";
import { AnimalType } from "./src/types/game";

export default function App() {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType | null>(null);
  return (
    <ImageBackground source={require('./src/assets/background.jpg')} style={styles.container} resizeMode="cover">
      <StatusBar style="auto" />
      {selectedAnimal === null ? (
      <SelectionScreen onSelect={setSelectedAnimal} />
       ) : (
      // TODO: remplacer par <GameScreen animal={selectedAnimal} onBack={() => setSelectedAnimal(null)} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#fff", fontSize: 20 }}>GameScreen — animal: {selectedAnimal}</Text>
      </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
