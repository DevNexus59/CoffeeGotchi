import { useRef, useEffect } from "react";
import { View, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions, Animated } from "react-native";
import { SPACING, RADIUS } from "../utils/theme";
import AnimalAvatar from "../components/AnimalAvatar";
import { AnimalType } from "../types/game";

const animals: AnimalType[] = ["chicken", "tiger", "penguin", "turtle", "elephant", "fox"];

const ANIMAL_COLORS: Record<AnimalType, string> = {
    chicken:  "#faa49e",
    tiger:    "#e0b377",
    penguin:  "#B8D8E8",
    turtle:   "#C5E8A0",
    elephant: "#faa49e",
    fox:      "#e0b377",
};

type Props = { onSelect: (animal: AnimalType) => void};

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const GRID_PADDING = SPACING.xl;
const CARD_GAP = SPACING.md;
const CARD_SIZE = (SCREEN_WIDTH - GRID_PADDING * 2 - CARD_GAP) / 2;
const AVATAR_SIZE = Math.floor(CARD_SIZE * 0.7);

type FloatingCardProps = {
    index: number;
    color: string;
    onPress: () => void;
    children: React.ReactNode;
};

function FloatingCard({ index, color, onPress, children }: FloatingCardProps) {
    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: -8,
                    duration: 1400,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 1400,
                    useNativeDriver: true,
                }),
            ])
        );
        const timeout = setTimeout(() => animation.start(), index * 250);
        return () => {
            clearTimeout(timeout);
            animation.stop();
        };
    }, []);

    return (
        <Animated.View style={[styles.card, { backgroundColor: color, transform: [{ translateY }] }]}>
            <TouchableOpacity
                style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}
                onPress={onPress}
                activeOpacity={0.85}
            >
                {children}
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.xl,
    },
    titleImage: {
        width: SCREEN_WIDTH * 0.8,
        height: 90,
        marginTop: SPACING.xl,
        marginBottom: SPACING.lg,
        alignSelf: "center",
    },
    scrollContent: {
        paddingBottom: SPACING.xl + 64,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: CARD_GAP,
    },
    card: {
        width: CARD_SIZE,
        height: CARD_SIZE,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: RADIUS.lg,
        borderWidth: 3,
        borderColor: "transparent",
        marginBottom: CARD_GAP,
    },

});

export default function SelectionScreen({onSelect}: Props) {
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/select-barista.png")}
                style={styles.titleImage}
                resizeMode="contain"
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.grid}>
                    {animals.map((animal, index) => (
                        <FloatingCard
                            key={animal}
                            index={index}
                            color={ANIMAL_COLORS[animal]}
                            onPress={() => onSelect(animal)}
                        >
                            <AnimalAvatar animal={animal} state="normal" size={AVATAR_SIZE} />
                        </FloatingCard>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
