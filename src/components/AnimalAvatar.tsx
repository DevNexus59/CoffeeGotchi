import { Image, StyleSheet, View } from "react-native";
import { AnimalType, AnimalState } from "../types/game";

class Animal {
  readonly type: AnimalType;
  private images: Record<AnimalState, any>;

  constructor(type: AnimalType, images: Record<AnimalState, any>) {
    this.type = type;
    this.images = images;
  }

  getImage(state: AnimalState): any {
    return this.images[state];
  }
}

const AnimalRegistry: Record<AnimalType, Animal> = {
  tiger: new Animal("tiger", {
    normal: require("../assets/images/animals/tiger_normal.png"),
    coffee: require("../assets/images/animals/tiger_coffee.png"),
    stone: require("../assets/images/animals/tiger_stone.png"),
    dead: require("../assets/images/animals/tiger_dead.png"),
  }),
  chicken: new Animal("chicken", {
    normal: require("../assets/images/animals/chicken_normal.png"),
    coffee: require("../assets/images/animals/chicken_coffee.png"),
    stone: require("../assets/images/animals/chicken_stone.png"),
    dead: require("../assets/images/animals/chicken_dead.png"),
  }),
  fox: new Animal("fox", {
    normal: require("../assets/images/animals/fox_normal.png"),
    coffee: require("../assets/images/animals/fox_coffee.png"),
    stone: require("../assets/images/animals/fox_stone.png"),
    dead: require("../assets/images/animals/fox_dead.png"),
  }),
  penguin: new Animal("penguin", {
    normal: require("../assets/images/animals/penguin_normal.png"),
    coffee: require("../assets/images/animals/penguin_coffee.png"),
    stone: require("../assets/images/animals/penguin_stone.png"),
    dead: require("../assets/images/animals/penguin_dead.png"),
  }),
  turtle: new Animal("turtle", {
    normal: require("../assets/images/animals/turtle_normal.png"),
    coffee: require("../assets/images/animals/turtle_coffee.png"),
    stone: require("../assets/images/animals/turtle_stone.png"),
    dead: require("../assets/images/animals/turtle_dead.png"),
  }),
  elephant: new Animal("elephant", {
    normal: require("../assets/images/animals/elephant_normal.png"),
    coffee: require("../assets/images/animals/elephant_coffee.png"),
    stone: require("../assets/images/animals/elephant_stone.png"),
    dead: require("../assets/images/animals/elephant_dead.png"),
  }),
};

type Props = {
  animal: AnimalType;
  state: AnimalState;
  size?: number;
};

function AnimalAvatar({ animal, state, size = 150 }: Props) {
  const source = AnimalRegistry[animal].getImage(state);

  return (
    <View style={styles.container}>
      <Image
        source={source}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AnimalAvatar;
