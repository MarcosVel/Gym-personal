import { VStack } from "native-base";
import HistoryCard from "../components/HistoryCard";
import ScreenHeader from "../components/ScreenHeader";

export default function History() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercício" />
      <HistoryCard />
    </VStack>
  );
}
