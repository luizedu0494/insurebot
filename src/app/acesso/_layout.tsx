import { Stack } from "expo-router";

export default function AcessoLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Se registrar" }} />
      <Stack.Screen name="sobre" options={{ title: "Sobre" }} />
      <Stack.Screen name="recuperar" options={{ title: "Recuperar senha" }} />
    </Stack>
  );
}