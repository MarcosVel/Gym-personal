import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import BodySVG from "../assets/body.svg";

export default function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1}>
        <VStack px={8} bg="gray.600" pt={4}>
          <TouchableOpacity onPress={handleGoBack}>
            <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
          </TouchableOpacity>

          <HStack
            justifyContent="space-between"
            alignItems="center"
            mt={4}
            mb={8}
          >
            <Heading
              color="gray.100"
              fontSize="lg"
              fontFamily="heading"
              flexShrink={1}
              numberOfLines={2}
              mr={1}
            >
              Puxada Frontal
            </Heading>

            <HStack alignItems="center">
              <BodySVG />
              <Text color="gray.200" ml={1} textTransform="capitalize">
                Costas
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
