import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Text, ImageBackground } from 'react-native';


//interface pour dire que le Loader attend un fontion "onFinished" 
// pour la relation entre le loader et la page a afficher 
// une fois que le loader est terminer
interface LoaderProps {
    onFinished?: () => void;
}

const Loader = ({ onFinished }: LoaderProps) => {

    // consts pour les animations 
    const translateY = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    // Animation bounce et pulse
    useEffect(() => {
        const startAnimation = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.parallel([
                        Animated.timing(translateY, {
                            toValue: -50,
                            duration: 600,
                            easing: Easing.out(Easing.exp),
                            useNativeDriver: true,
                        }),
                        Animated.timing(scale, {
                            toValue: 1.1,
                            duration: 600,
                            useNativeDriver: true
                        }),
                    ]),
                    Animated.parallel([
                        Animated.timing(translateY, {
                            toValue: 0,
                            duration: 500,
                            easing: Easing.bounce,
                            useNativeDriver: true,
                        }),
                    ]),
                ])
            ).start()
        };

        startAnimation();

        //fin du chargement après 4 secondes
        const timer = setTimeout(() => {
            if (onFinished) onFinished(); // permet d'appeler la fonction qu'il faudra mettre dans App pour basculer.
        }, 4000);

        return () => clearTimeout(timer);
    }, [onFinished]);

    return (
        <ImageBackground
        source={require('../assets/loader-img/Loader.jpg')}
        style={styles.background}
        resizeMode='cover'>
            <View style={styles.overlay}>
                <Animated.Image
            source={require('../assets/loader-img/logo.png')}
            style={[
                styles.logo,
                {transform: [{ translateY }, { scale }]},
                    ]}
                />
                <Text style={styles.text}>Préparation du café...</Text>
                <View style={{height: 100}} />
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
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: -110,
    },
    logo: {
        width: 280,
        height: 230,
        resizeMode: 'contain',
    },
    text: {
        position: 'absolute',
        bottom: 2,
        alignSelf: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    }
});

export default Loader;