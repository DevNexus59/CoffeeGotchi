import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground } from 'react-native';
import SelectionScreen from './src/screens/SelectionScreen';

export default function App() {
  return (
    <ImageBackground source={require('./src/assets/background.jpg')} style={styles.container} resizeMode="cover">
      <StatusBar style="auto" />
      <SelectionScreen />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
