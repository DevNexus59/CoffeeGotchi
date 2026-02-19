import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { COLORS, SPACING, RADIUS } from "../utils/theme";

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        padding: SPACING.lg,
    },
    titleImage: {
        width: Dimensions.get('window').width * 0.8,
        height: 80,
        marginBottom: SPACING.lg,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 16,
    },
    card: {
        width: "28%",
        alignItems: "center",
        backgroundColor: COLORS.card,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
    },
    label: {
        color: "#fff",
        marginTop: 8,
        textTransform: "capitalize",
    },
});

export default function SelectionScreen() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/select-barista.png')} style={styles.titleImage} resizeMode="contain" />

            <View style={styles.grid}>
                
                    <TouchableOpacity style={styles.card}>
            <Text style={styles.label}>graouh</Text>
                    </TouchableOpacity>
                
            </View>
        </View>
    );
}