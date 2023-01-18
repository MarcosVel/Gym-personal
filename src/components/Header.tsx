import { Heading, HStack, Text, VStack } from "native-base";
import React from "react";
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

      <VStack>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md">
          Marcos
        </Heading>
      </VStack>
    </HStack>
  );
}
