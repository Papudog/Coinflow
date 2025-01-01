import { theme } from "@/constants/theme";
import { Stack, useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.light,
        },
      }}
    />
  );
}
