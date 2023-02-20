import { useNavigation } from "@react-navigation/native";
import { FlatList, Heading, HStack, Text, VStack } from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ExerciseCard from "../components/ExerciseCard";
import Group from "../components/Group";
import Header from "../components/Header";
import { AppNavigatorRoutesProps } from "../routes/app.routes";

export default function Home() {
  const [groups, setGroups] = useState([
    "costas",
    "ombro",
    "biceps",
    "triceps",
  ]);
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
