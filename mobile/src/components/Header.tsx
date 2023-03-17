import { MaterialIcons } from "@expo/vector-icons";
import { Heading, HStack, Icon, Text, VStack } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import useAuth from "../hooks/useAuth";
import UserPhoto from "./UserPhoto";
import defaultUserPhoto from "../assets/userPhotoDefault.png";
import { api } from "../services/api";

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <HStack bg="gray.600" pt={5} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
            : defaultUserPhoto
        }
        size={16}
        alt="Imagem do usuário"
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
