import { Center, ScrollView, Skeleton, Text, VStack } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
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

            <TouchableOpacity>
              <Text
                color="green.500"
                fontFamily="heading"
                fontSize="md"
                mt={3}
                mb={8}
              >
                Alterar foto
              </Text>
            </TouchableOpacity>

            <Input
              placeholder="Nome"
              bg="gray.600"
              _focus={{
                bg: "gray.600",
                borderColor: "green.500",
              }}
            />

            <Input
              placeholder="E-mail"
              bg="gray.600"
              _focus={{
                bg: "gray.600",
                borderColor: "green.500",
              }}
              isDisabled
            />
          </Center>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
}
