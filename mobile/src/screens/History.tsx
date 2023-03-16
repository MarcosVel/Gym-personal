import { useFocusEffect } from "@react-navigation/native";
import { Heading, SectionList, Text, useToast, VStack } from "native-base";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HistoryCard from "../components/HistoryCard";
import Loading from "../components/Loading";
import ScreenHeader from "../components/ScreenHeader";
import { HistoryByDayDTO } from "../dto/HistoryByDayDTO";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";

export default function History() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  async function fetchHistory() {
    try {
      setIsLoading(true);

      const response = await api.get("/history");
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico";

      toast.show({ title, bgColor: "red.500" });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1}>
        <ScreenHeader title="Histórico de exercício" />

        {isLoading ? (
          <Loading />
        ) : (
          <SectionList
            sections={exercises}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <HistoryCard data={item} />}
            renderSectionHeader={({ section }) => (
              <Heading
                color="gray.200"
                fontSize="md"
                fontFamily="heading"
                mt={10}
                mb={3}
              >
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
        )}
      </VStack>
    </SafeAreaView>
  );
}
