import { Center, ScrollView, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../components/ScreenHeader";
import UserPhoto from "../components/UserPhoto";

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1}>
        <ScreenHeader title="Perfil" />

        <ScrollView>
          <Center mt={6} px={10}>
            <UserPhoto
              source={{ uri: "https://github.com/MarcosVel.png" }}
              alt="User photo"
              size={33}
              height={33}
            />
          </Center>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
}
