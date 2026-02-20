import React from "react"
import { StyleSheet, ImageBackground, Image, View, TouchableOpacity, Text } from "react-native";
import { useAudioPlayer } from "expo-audio";
import { useEffect } from "react";

interface WinnerScreenProps {
    state: React.Dispatch<React.SetStateAction<"win" | "coffee_over" | "tea_over" | "playing">>;
    animal: string;
}

const ANIMAL_IMAGES: { [key: string]: any } = {
  chicken: require("../assets/images/animals/chicken_win.png"),
  elephant: require("../assets/images/animals/elephant_win.png"),
  fox: require("../assets/images/animals/fox_win.png"),
  penguin: require("../assets/images/animals/penguin_win.png"),
  tiger: require("../assets/images/animals/tiger_win.png"),
  turtle: require("../assets/images/animals/turtle_win.png"),
};

const WinnerScreen = ({ state, animal }: WinnerScreenProps) => {
  const imageSource = ANIMAL_IMAGES[animal];

   
  const player = useAudioPlayer(
    require('../assets/sounds/game_win.mp3')
  );
  
  useEffect(() => {
    player.play();
  }, [player.play]);

  const clickRetry = useAudioPlayer(require('../assets/sounds/click_game_start.mp3'));
  const handleRetry = () => {
    clickRetry.play();
      // Tu pourras ajouter ici la logique pour recommencer le jeu
    state("playing");  
  };  

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
      resizeMode='cover'
    >
      <View style={styles.container }>
        <Image source={require("../assets/images/bravo.png")}
          style={styles.win} 
          resizeMode="contain" // 🖼️ Garantit que l'image est entière
        />
        <Image source={imageSource}
          style={styles.animal } 
          resizeMode="contain"
        />

        <TouchableOpacity onPress={handleRetry}>
          <Image source={require("../assets/replay_button.png")}
            style={styles.button}
            resizeMode="contain" 
          />
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
    justifyContent: 'space-around',
    padding: 20,
    marginTop: 40,
  },  
  win: {
    width: 300,
    height: 150,
  },
  animal: {
    width: 300,
    height: 200,
    marginTop: -20,
  },
  button: {
    width: 230,
    height: 150,
  },

})

export default WinnerScreen;