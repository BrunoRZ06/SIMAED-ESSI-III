import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { ArrowLeft, BookOpen, ClipboardList } from "lucide-react-native";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.icon}><BookOpen size={30} color="#286D9B" /></View>
        <Text style={styles.title}>Não encontramos essa tela</Text>
        <Text style={styles.description}>O endereço pode ter expirado. Seus simulados salvos continuam no histórico deste dispositivo.</Text>
        <TouchableOpacity accessibilityRole="button" style={styles.primary} onPress={() => router.replace("/(tabs)/simulados")}>
          <ClipboardList size={18} color="#FFF" /><Text style={styles.primaryText}>Abrir meus simulados</Text>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" style={styles.secondary} onPress={() => router.replace("/mock-exam/mock-exam")}>
          <ArrowLeft size={17} color="#286D9B" /><Text style={styles.secondaryText}>Voltar à geração</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F8FC", justifyContent: "center", alignItems: "center", padding: 28, gap: 14 },
  icon: { width: 70, height: 70, borderRadius: 22, backgroundColor: "#E0F2FE", alignItems: "center", justifyContent: "center" },
  title: { color: "#090B2B", fontSize: 21, lineHeight: 28, fontWeight: "800", textAlign: "center" },
  description: { color: "#667085", fontSize: 14, lineHeight: 21, textAlign: "center", maxWidth: 350, marginBottom: 8 },
  primary: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "#286D9B", borderRadius: 11, paddingVertical: 13, paddingHorizontal: 18, minWidth: 230 },
  primaryText: { color: "#FFF", fontSize: 14, fontWeight: "700" },
  secondary: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "#FFF", borderWidth: 1, borderColor: "#B2DDFF", borderRadius: 11, paddingVertical: 12, paddingHorizontal: 18, minWidth: 230 },
  secondaryText: { color: "#286D9B", fontSize: 14, fontWeight: "700" },
});
