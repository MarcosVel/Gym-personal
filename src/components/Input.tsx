import { Input as NativeBaseInput, IInputProps } from "native-base";
import React from "react";

export default function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg="gray.700"
      h={14}
      px={4}
      borderColor="gray.700"
      fontSize="md"
      color="gray.100"
      fontFamily="body"
      mb={4}
      placeholderTextColor="gray.300"
      _focus={{
        bg: "gray.700",
        borderColor: "green.500",
      }}
      {...rest}
    />
  );
}
