import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { NativeBaseProvider } from "native-base";
import { StatusBar, Text } from "react-native";
import Loading from "./src/components/Loading";
import { THEME } from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? (
        <Text style={{ fontFamily: "Roboto_700Bold" }}>
          Open up App.tsx to start working on your app!
        </Text>
      ) : (
        <Loading />
      )}
    </NativeBaseProvider>
  );
}
