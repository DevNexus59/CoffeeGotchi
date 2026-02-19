import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import GameOverScreen from "./src/screens/GameOverScreen";
import Loader from "./src/screens/Loader";
import AnimalAvatar from "./src/components/AnimalAvatar";
import SelectionScreen from './src/screens/SelectionScreen';
import { useState } from "react";
import { AnimalType } from "./src/types/game";

export default function App() {
    //Création d'un état pour savoir si on affiche le loader ou autre page
    const [isLoading, setIsLoading] = useState(true);
    // creation d'un etat pour savoir quel animal est selectionne
    const [selectedAnimal, setSelectedAnimal] = useState<AnimalType | null>(null);

    return (
        <ImageBackground source={require('./src/assets/background.jpg')} style={styles.container} resizeMode="cover">
            <StatusBar style="auto" />
            {isLoading ? (
                <Loader onFinished={() => setIsLoading(false)} />
            ) : selectedAnimal === null ? (
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
