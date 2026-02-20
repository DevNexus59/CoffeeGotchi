import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import { useAudioPlayer } from "expo-audio";
import { useEffect } from "react";

interface GameOverScreenProps {
    state: React.Dispatch<React.SetStateAction<"win" | "coffee_over" | "tea_over" | "playing">>;
    reason: "win" | "coffee_over" | "tea_over";
}



const GameOverScreen = ({ state, reason }: GameOverScreenProps) => {
  
  const player = useAudioPlayer(
    require('../assets/sounds/game_over.mp3')
  );

  useEffect(() => {
    player.play();
  }, []);
    
  const clickRetry = useAudioPlayer(require('../assets/sounds/click_game_start.mp3'));

  const handleRetry = () => {
    clickRetry.play();
    // Logique pour réinitialiser le jeu ou naviguer vers l'écran de sélection
    state("playing");
  };   
   
  return (
    <ImageBackground
      source={reason ==='tea' ? require('../assets/images/backgrounds/tea-over.jpg') : require('../assets/images/backgrounds/coffee-over.jpg')}
      style={styles.background}
      resizeMode='cover'
    >
      <View style={styles.container}>
        <Image source={require("../assets/images/gameover.png")}
        style={styles.over} 
        resizeMode="contain" // 🖼️ Garantit que l'image est entière
        />
           
        <Image source={require("../assets/images/animals/skull.png")}
        style={styles.skull} 
        resizeMode="contain" // 🖼️ Garantit que l'image est entière
        />
        <View style={styles.boxMessage}>
          <Text style={styles.message}>
            Ton compagnon a succombé à une overdose de {reason ==="tea" ? "thé" : "café"}
          </Text>
        

          <TouchableOpacity style={styles.button} onPress={handleRetry}>
            <Text style={styles.buttonText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: 80,
  },
  over: {
    width: 300,
    height: 150,
  },
  skull: {
    width: 200,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  boxMessage :{
    backgroundColor: '#6f4e37',
    marginBottom: 60,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 40
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    
  },
  buttonText: {
    color: '#6f4e37',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameOverScreen;