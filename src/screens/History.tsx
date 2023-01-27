import { VStack } from "native-base";
import ScreenHeader from "../components/ScreenHeader";

export default function History() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercício" />
    </VStack>
  );
}
