import { Center, Heading } from "native-base";

type Props = {
  title: string;
};

export default function ScreenHeader({ title }: Props) {
  return (
    <Center bg="gray.600" pb={6} pt={12}>
      <Heading color="gray.100" fontSize="xl">
        {title}
      </Heading>
    </Center>
  );
}
