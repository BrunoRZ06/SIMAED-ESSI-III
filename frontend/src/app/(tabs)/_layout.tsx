import { Tabs } from "expo-router";
import { ClipboardList, House } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#286D9B",
      tabBarInactiveTintColor: "#667085",
      tabBarStyle: { backgroundColor: "#FFFFFF", borderTopColor: "#E4E7EC" },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="simulados"
        options={{
          title: "Simulados",
          tabBarIcon: ({ color, size }) => <ClipboardList color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
