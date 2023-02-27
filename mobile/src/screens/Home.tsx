import { useNavigation } from "@react-navigation/native";
import { FlatList, Heading, HStack, Text, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ExerciseCard from "../components/ExerciseCard";
import Group from "../components/Group";
import Header from "../components/Header";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";

export default function Home() {
  const toast = useToast();
  const [groups, setGroups] = useState<string[]>([]);
  const [groupSelected, setGroupSelected] = useState("costas");
  const [exercises, setExercises] = useState([
    "Puxada frontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamento terra",
  ]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate("exercise");
  }

  async function fetchGroups() {
    try {
      const { data } = await api.get("/groups");
      setGroups(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos.";

      toast.show({
        title,
        bgColor: "red.500",
      });
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1}>
        <Header />

        <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Group
              name={item}
              isActive={
                groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
              }
              onPress={() => setGroupSelected(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          _contentContainerStyle={{ px: 8 }}
          my={10}
          maxH={10}
        />

        <VStack flex={1} px={8}>
          <HStack justifyContent="space-between" mb={5}>
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Exercícios
            </Heading>
            <Text color="gray.200" fontSize="sm">
              4
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <ExerciseCard title={item} onPress={handleOpenExerciseDetails} />
            )}
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
          />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
