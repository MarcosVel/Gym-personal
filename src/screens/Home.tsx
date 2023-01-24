import { FlatList, HStack, VStack } from "native-base";
import { useState } from "react";
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

  return (
    <VStack flex={1}>
      <Header />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
      />
    </VStack>
  );
}
