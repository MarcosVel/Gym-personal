import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from "native-base";
import React from "react";

type Props = IInputProps & {
  errorMessage?: string | null;
};

export default function Input({
  errorMessage = null,
  isInvalid,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        bg="gray.700"
        h={14}
        px={4}
        borderColor="gray.700"
        rounded="md"
        fontSize="md"
        color="gray.100"
        fontFamily="body"
        placeholderTextColor="gray.300"
        _focus={{
          bg: "gray.700",
          borderColor: "green.500",
        }}
        _invalid={{
          borderColor: "red.500",
        }}
        {...rest}
      />

      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
