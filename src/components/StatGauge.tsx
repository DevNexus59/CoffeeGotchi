import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

class BalanceGauge {
  private value: number;

  constructor(value: number) {
    this.value = Math.min(Math.max(value, 0), 100);
  }

  getPosition(): number {
    return this.value / 100;
  }

  getColor(): string {
    return this.isDangerous() ? "#E53935" : "#ffffff";
  }

  getLabel(): string {
    const v = this.value;
    if (v < 20) return "Complètement stone";
    if (v < 35) return "Un peu trop relax";
    if (v <= 65) return "Équilibré";
    if (v <= 80) return "Un peu agité";
    return "Overdose de café";
  }

  isDangerous(): boolean {
    return this.value < 20 || this.value > 80;
  }
}

type Props = {
  value: number;
};

function StatGauge({ value }: Props) {
  const gauge = new BalanceGauge(value);

  return (
    <View style={styles.wrapper}>
      <View style={styles.extremes}>
        <Text style={styles.extremeLabel}>🌿 Tisane</Text>
        <Text style={styles.extremeLabel}>Café ☕</Text>
      </View>

      <LinearGradient
        colors={["#93d769", "#ffdb83"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.track}
      >
        <View
          style={[
            styles.cursor,
            {
              left: `${gauge.getPosition() * 100}%`,
              backgroundColor: gauge.getColor(),
            },
          ]}
        />
      </LinearGradient>

      <Text
        style={[
          styles.label,
          { color: gauge.isDangerous() ? "#E53935" : "#4CAF50" },
        ]}
      >
        {gauge.getLabel()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingHorizontal: 16,
    gap: 8,
    alignItems: "center",
  },
  extremes: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  extremeLabel: {
    fontSize: 13,
    color: "#555",
    fontWeight: "bold",
  },
  track: {
    width: "100%",
    height: 30,
    backgroundColor: "#E0E0E0",
    borderRadius: 14,
    justifyContent: "center",
    position: "relative",
  },
  cursor: {
    position: "absolute",
    width: 34,
    height: 34,
    borderRadius: 17,
    top: -3,
    marginLeft: -14,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default StatGauge;
