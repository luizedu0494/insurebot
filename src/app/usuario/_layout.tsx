import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Platform } from "react-native";

export default function LayoutUsuario() {
  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={['top']}>
      <Tabs
        screenOptions={{
          headerShown: false, 
          tabBarActiveTintColor: "#0284c7", 
          tabBarInactiveTintColor: "#64748b", 
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#e2e8f0",
            height: Platform.OS === 'ios' ? 88 : 64, 
            paddingBottom: Platform.OS === 'ios' ? 28 : 10,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          }
        }}
      >
        <Tabs.Screen
          name="chat"
          options={{
            title: "Conversa",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"} 
                size={22} 
                color={color} 
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Meu Perfil",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? "person" : "person-outline"} 
                size={22} 
                color={color} 
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}