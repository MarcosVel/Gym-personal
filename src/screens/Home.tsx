import { FlatList, Heading, HStack, Text, VStack } from "native-base";
import { useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import Group from "../components/Group";
import Header from "../components/Header";

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

  return (
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
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            4
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <ExerciseCard title={item} />}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
    </VStack>
  );
}
