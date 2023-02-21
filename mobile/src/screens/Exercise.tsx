import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BodySvg from "../assets/body.svg";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import SeriesSvg from "../assets/series.svg";
import RepetitionsSvg from "../assets/repetitions.svg";
import Button from "../components/Button";

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
              <BodySvg />
              <Text color="gray.200" ml={1} textTransform="capitalize">
                Costas
              </Text>
            </HStack>
          </HStack>
        </VStack>

        <ScrollView _contentContainerStyle={{ padding: 8 }}>
          <Image
            w="full"
            h={80}
            source={{
              uri: "https://www.blog.nadarte.com/wp-content/uploads/2020/08/post_thumbnail-8a5bda2fbdc6f9daf947372a70ecec75-1160x770.jpeg",
            }}
            alt="nome do exercicio"
            mb={3}
            resizeMode="cover"
            rounded="lg"
          />

          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb={6}
              mt={5}
            >
              <HStack alignItems="center">
                <SeriesSvg />
                <Text color="gray.200" ml={2}>
                  3 séries
                </Text>
              </HStack>

              <HStack alignItems="center">
                <RepetitionsSvg />
                <Text color="gray.200" ml={2}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
}