import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BodySvg from "../assets/body.svg";
import RepetitionsSvg from "../assets/repetitions.svg";
import SeriesSvg from "../assets/series.svg";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { ExerciseDTO } from "../dto/ExerciseDTO";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";

type RouteParamsProps = {
  exerciseId: string;
};

export default function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const toast = useToast();
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const [isLoading, setIsLoading] = useState(true);

  const { exerciseId } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
      setExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício";

      toast.show({ title, bgColor: "red.500" });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

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
            mb={6}
          >
            <Heading
              color="gray.100"
              fontSize="lg"
              fontFamily="heading"
              flexShrink={1}
              numberOfLines={2}
              mr={1}
            >
              {exercise.name}
            </Heading>

            <HStack alignItems="center">
              <BodySvg />
              <Text color="gray.200" ml={1} textTransform="capitalize">
                {exercise.group}
              </Text>
            </HStack>
          </HStack>
        </VStack>

        {isLoading ? (
          <Loading />
        ) : (
          <ScrollView _contentContainerStyle={{ padding: 8 }}>
            <Box rounded="lg" mb={3} overflow="hidden">
              <Image
                w="full"
                h={80}
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                alt="nome do exercicio"
                resizeMode="cover"
                rounded="lg"
              />
            </Box>

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
                    {exercise.series} séries
                  </Text>
                </HStack>

                <HStack alignItems="center">
                  <RepetitionsSvg />
                  <Text color="gray.200" ml={2}>
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button title="Marcar como realizado" />
            </Box>
          </ScrollView>
        )}
      </VStack>
    </SafeAreaView>
  );
}
