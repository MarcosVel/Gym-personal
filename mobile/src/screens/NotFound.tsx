import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Text } from "native-base";
import Button from "../components/Button";
import { AppNavigatorRoutesProps } from "../routes/app.routes";

export default function NotFound() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  return (
    <Center flex={1} bg="gray.700" px="12" pb="12">
      <Heading color="gray.100" fontSize="9xl" mt="auto">
        404
      </Heading>
      <Text color="gray.200" fontSize="md" fontFamily="body" mb="auto">
        Não encontramos o que você procura
      </Text>
      <Button title="Voltar" onPress={() => navigation.navigate("home")} />
    </Center>
  );
}
