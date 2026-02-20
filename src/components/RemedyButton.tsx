import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Image, StyleSheet, Animated, Easing } from 'react-native';

// définition des types pour le bouton
interface RemedyButtonProps {
    type: 'coffee' | 'herbal-tea';
    onPress: () => void;
}

const RemedyButton = ({ type, onPress }: RemedyButtonProps) => {
    //choix de l'image en fonction du 'type'
    const isCoffee = type === 'coffee';

    //création de l'animation de haut en bas
    //des petits éléments flottants
    const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  //définition de la hauteur du mouvement
  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -7],
  });


    //définition des assets en fonction du type
    const mainIcon = isCoffee
    ? require('../assets/buttons/icon_coffee.png')
    : require('../assets/buttons/icon_herbaltea.png');

    //Gestion des éléments flottants
    const float1 = isCoffee ? require('../assets/buttons/star1.png') : require('../assets/buttons/flower1.png');
    const float2 = isCoffee ? require('../assets/buttons/star2.png') : require('../assets/buttons/flower2.png');
    const float3 = isCoffee ? require('../assets/buttons/star3.png') : require('../assets/buttons/flower3.png');

    //Définition des couleurs de fond en fonction du type
    const backgroundColor = isCoffee ? '#93d769' : '#ffdb83';

    return (
        <TouchableOpacity style={[styles.button, {backgroundColor}]} onPress={onPress} activeOpacity={0.7}>
            {/* élément flottant 1 à gauche */}
            <Animated.Image source={float1} style={[styles.floating, styles.posLeft, {transform: [{ translateY }, {rotate:'-15deg'}] } ]}/>
            {/* élément flottant 2 au centre */}
            <Animated.Image source={float2} style={[styles.floating, styles.posCenter, {transform: [{ translateY }] }]} />
            {/* élément flottant 3 à droite */}
            <Animated.Image source={float3} style={[styles.floating, styles.posRight, {transform: [{ translateY }, {rotate:'15deg'}] }]} />
            {/* image principale */}
            <Image source={mainIcon} style={styles.mainImage} />
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    button: {
        width: 70,
        height: 70,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    mainImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        zIndex: 2,
        marginTop: 10,
    },
    floating: {
        position: 'absolute',
        width: 25,
        height: 25,
        resizeMode: 'contain',
        zIndex: 1,
    },
    posLeft: { 
        top: 5,
        left: 8,
        transform: [{rotate: '-15deg'}]
    },
    posCenter: {
        top: -10,
        alignSelf: 'center',
    },
    posRight: {
        top: 5,
        right: 8,
        transform: [{rotate: '15deg'}],
    },
});

export default RemedyButton;
