import { ONESIGNAL_APP_ID } from "@env";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";
import { OneSignal } from "react-native-onesignal";
import Loading from "./src/components/Loading";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { Routes } from "./src/routes";
import { THEME } from "./src/theme";

OneSignal.initialize(ONESIGNAL_APP_ID);

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
