import { Heading, HStack, Text, VStack } from "native-base";
import React from "react";

export default function Header() {
  return (
    <HStack bg="gray.600" pt={12} pb={5} px={8} alignItems="center">
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
