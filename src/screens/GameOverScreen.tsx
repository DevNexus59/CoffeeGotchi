import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import { useAudioPlayer } from "expo-audio";
import { useEffect } from "react";



const GameOverScreen = ({ animalId, reason }: { animalId: string, reason: string}) => {

  
    const player = useAudioPlayer(
      require('../assets/sounds/game_over.mp3')
    );

    useEffect(() => {
      player.play();
    }, []);
    
      
   
  return (
    <ImageBackground
      source={require('../assets/images/backgrounds/background4.jpg')}
      style={styles.background}
      resizeMode='cover'
    >
      <View style={styles.container}>
        <Text style={styles.title}> GAME OVER 💀</Text>
        <Image source={{ uri: 'https://via.placeholder.com/200'}} // À remplacer par tes assets
        style={styles.avatar}
        />

        <Text style={styles.message}>
          Ton compagnon a succombé à : {reason}
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Réessayer</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: '#d1b8a0',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#6f4e37',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameOverScreen;