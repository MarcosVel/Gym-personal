import { yupResolver } from "@hookform/resolvers/yup";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import Button from "../components/Button";
import Input from "../components/Input";
import ScreenHeader from "../components/ScreenHeader";
import UserPhoto from "../components/UserPhoto";
import useAuth from "../hooks/useAuth";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
};

const profileSchema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  password: yup
    .string()
    .min(6, "Mínimo de 6 caracteres")
    .nullable()
    .transform(value => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform(value => (!!value ? value : null))
    .oneOf([yup.ref("password"), null], "As senhas não conferem")
    .when("password", {
      is: (Field: any) => Field,
      then: schema =>
        schema.nullable().required("Confirmação de senha obrigatória"),
    }),
});

export default function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/MarcosVel.png"
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const toast = useToast();
  const { user, updateUserProfile } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      setPhotoIsLoading(true);

      if (photoSelected.canceled) return;

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        // divided 2x to convert bytes to mb
        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Essa imagem é muito grande.",
            description: "Escolha uma de até 5MB.",
            placement: "top",
          });
        }

        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.log("Error in handleUserPhotoSelect: ", error);
      toast.show({ title: "Erro ao alterar a foto", bgColor: "red.500" });
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      const userUpdated = user;
      userUpdated.name = data.name;

      await api.put("/users", data);

      await updateUserProfile(userUpdated);

      toast.show({
        title: "Perfil atualizado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Erro ao atualizar o perfil";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsUpdating(false);
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

            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Nome"
                  bg="gray.600"
                  _focus={{
                    bg: "gray.600",
                    borderColor: "green.500",
                  }}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { value } }) => (
                <Input
                  placeholder="E-mail"
                  bg="gray.600"
                  _focus={{
                    bg: "gray.600",
                    borderColor: "green.500",
                  }}
                  isDisabled
                  value={value}
                />
              )}
            />
          </Center>

          <VStack px={10} mt={12} mb={9}>
            <Heading color="gray.200" fontSize="md" fontFamily="heading" mb={2}>
              Alterar senha
            </Heading>

            <Controller
              control={control}
              name="old_password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Senha antiga"
                  bg="gray.600"
                  secureTextEntry
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Senha nova"
                  bg="gray.600"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Confirme nova senha"
                  bg="gray.600"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.confirm_password?.message}
                />
              )}
            />

            <Button
              title="Atualizar"
              mt={4}
              isLoading={isUpdating}
              onPress={handleSubmit(handleProfileUpdate)}
            />
          </VStack>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
}
