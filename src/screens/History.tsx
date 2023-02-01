import { Heading, SectionList, Text, VStack } from "native-base";
import { useState } from "react";
import HistoryCard from "../components/HistoryCard";
import ScreenHeader from "../components/ScreenHeader";

export default function History() {
  const [exercises, setExercises] = useState([
    {
      title: "26.08.23",
      data: ["Puxada frontal", "Remada unilateral"],
    },
    {
      title: "25.08.23",
      data: ["Puxada frontal"],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercício" />

      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        px={8}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: "center" }
        }
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            <Text style={{ fontWeight: "bold" }}>
              Não há exercícios registrados ainda.
            </Text>
            {"\n"}
            Vamos fazer um exercício hoje?
          </Text>
        )}
      />
    </VStack>
  );
}
