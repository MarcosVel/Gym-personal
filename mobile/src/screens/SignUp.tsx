import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Background from "../assets/background.png";
import LogoSvg from "../assets/logo.svg";
import Button from "../components/Button";
import Input from "../components/Input";
import useAuth from "../hooks/useAuth";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "A senha deve ter pelo menos 6 dígitos"),
  password_confirm: yup
    .string()
    .required("Confirme a senha")
    .oneOf([yup.ref("password"), null], "As senhas não coincidem"),
});

export default function SignUp() {
  const navigation = useNavigation();
  const toast = useToast();
  const { signIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
    resolver: yupResolver(signUpSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      setIsLoading(true);

      await api.post("/users", { name, email, password });
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Erro ao criar conta. Tente novamente mais tarde.";

      return toast.show({
        title,
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={Background}
        defaultSource={Background}
        alt="Background pessoas treinando"
        position="absolute"
        resizeMode="contain"
      />

      <VStack flex={1} px={10} pb={16}>
        <Center mt={24} mb={16}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center mt={"auto"}>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>

        <Button
          title="Voltar para o login"
          variant="outline"
          mt={8}
          onPress={() => navigation.goBack()}
        />
      </VStack>
    </ScrollView>
  );
}
