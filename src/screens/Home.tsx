import { VStack } from "native-base";
import Group from "../components/Group";
import Header from "../components/Header";

export default function Home() {
  return (
    <VStack flex={1}>
      <Header />

      <Group name="Grupo" />
    </VStack>
  );
}
