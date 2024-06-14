import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

const linking = {
  prefixes: ["ignitegym://", "com.ignitegym://"],
  config: {
    screens: {
      signIn: {
        path: "login",
      },
      exercise: {
        path: "exercise/:exerciseId",
        parse: {
          exerciseId: (exerciseId: string) => exerciseId,
        },
      },
      notFound: "*",
    },
  },
};

export function Routes() {
  const { colors } = useTheme();
  const { user, isLoadingUserStorage } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  if (isLoadingUserStorage) {
    return <Loading />;
  }

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer
        theme={theme}
        linking={linking}
        fallback={<Loading />}
      >
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
