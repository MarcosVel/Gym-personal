import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Input from "../components/Input";
import ScreenHeader from "../components/ScreenHeader";
import UserPhoto from "../components/UserPhoto";
import * as ImagePicker from "expo-image-picker";

const PHOTO_SIZE = 33;

export default function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/MarcosVel.png"
  );

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      setPhotoIsLoading(true);

      console.log(photoSelected);

      if (photoSelected.canceled) return;

      if (photoSelected.assets[0].uri) {
        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.log("Error in handleUserPhotoSelect: ", error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

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
                source={{ uri: userPhoto }}
                alt="User photo"
                size={PHOTO_SIZE}
              />
            )}

            <TouchableOpacity onPress={handleUserPhotoSelect}>
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

          <VStack px={10} mt={12} mb={9}>
            <Heading color="gray.200" fontSize="md" fontFamily="heading" mb={2}>
              Alterar senha
            </Heading>

            <Input placeholder="Senha antiga" bg="gray.600" secureTextEntry />
            <Input placeholder="Senha nova" bg="gray.600" secureTextEntry />
            <Input
              placeholder="Confirme nova senha"
              bg="gray.600"
              secureTextEntry
            />

            <Button title="Atualizar" mt={4} />
          </VStack>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
}
