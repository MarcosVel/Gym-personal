import { MaterialIcons } from "@expo/vector-icons";
import { Heading, HStack, Text, VStack, Icon } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import UserPhoto from "./UserPhoto";

export default function Header() {
  return (
    <HStack bg="gray.600" pt={12} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={{ uri: "https://github.com/MarcosVel.png" }}
        size={16}
        alt="Imagem do usuário"
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md">
          Marcos
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
