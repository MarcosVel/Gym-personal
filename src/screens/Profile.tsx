import { Center, ScrollView, Skeleton, VStack } from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../components/ScreenHeader";
import UserPhoto from "../components/UserPhoto";

const PHOTO_SIZE = 33;

export default function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1}>
        <ScreenHeader title="Perfil" />

        <ScrollView>
          <Center mt={6} px={10}>
            {photoIsLoading ? (
              <Skeleton
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded="full"
                startColor="gray.400"
                endColor="gray.600"
              />
            ) : (
              <UserPhoto
                source={{ uri: "https://github.com/MarcosVel.png" }}
                alt="User photo"
                size={PHOTO_SIZE}
              />
            )}
          </Center>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
}
