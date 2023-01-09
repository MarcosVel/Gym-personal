import { Center, Image, Text, VStack } from "native-base";
import React from "react";
import Background from "../assets/background.png";
import LogoSvg from "../assets/logo.svg";

export default function SignIn() {
  return (
    <VStack flex={1} bg="gray.700">
      <Image
        source={Background}
        alt="Background pessoas treinando"
        position="absolute"
        resizeMode="contain"
      />

      <Center my={24}>
        <LogoSvg />

        <Text color="gray.100" fontSize="sm">
          Treine sua mente e o seu corpo
        </Text>
      </Center>
    </VStack>
  );
}
