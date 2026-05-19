import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" translucent={false} backgroundColor="#ffffff" />
      
      <SafeAreaView 
        style={{ flex: 1, backgroundColor: '#ffffff' }} 
        edges={['top', 'bottom']}
      >
        <Stack screenOptions={{ headerShown: false }}>

          <Stack.Screen name="index" />
          <Stack.Screen name="acesso" />
          <Stack.Screen name="usuario" />

        </Stack>

      </SafeAreaView>
      
    </SafeAreaProvider>
  );
}