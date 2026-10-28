import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ClipboardList, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { getSavedMockExams } from '@/src/features/mock-exam/services/mockExamHistoryService';

export default function HomeScreen() {
  const router = useRouter();
  const [checkingHistory, setCheckingHistory] = useState(false);

  const handleGeneratePress = async () => {
    if (checkingHistory) return;

    setCheckingHistory(true);
    try {
      const savedExams = await getSavedMockExams();
      if (savedExams.length === 0) {
        router.push('/mock-exam/mock-exam');
        return;
      }

      Alert.alert(
        'O que você gostaria de fazer?',
        `Você já tem ${savedExams.length} ${savedExams.length === 1 ? 'simulado salvo' : 'simulados salvos'} neste dispositivo.`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Visualizar simulados', onPress: () => router.push('/(tabs)/simulados') },
          { text: 'Gerar novo', onPress: () => router.push('/mock-exam/mock-exam') },
        ],
      );
    } catch {
      // Se o histórico local estiver indisponível, ainda permite iniciar uma geração.
      router.push('/mock-exam/mock-exam');
    } finally {
      setCheckingHistory(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>SIMAED</Text>
      <Text style={styles.title}>Olá! 👋</Text>
      <Text style={styles.subtitle}>Crie um simulado ou retome um que você já gerou.</Text>
      <TouchableOpacity accessibilityRole="button" style={styles.primaryButton} onPress={handleGeneratePress} disabled={checkingHistory}>
        <Plus size={20} color="#FFFFFF" />
        <Text style={styles.primaryText}>{checkingHistory ? 'Verificando simulados…' : 'Gerar simulado'}</Text>
      </TouchableOpacity>
      <TouchableOpacity accessibilityRole="button" style={styles.secondaryButton} onPress={() => router.push("/(tabs)/simulados")}>
        <ClipboardList size={20} color="#286D9B" />
        <Text style={styles.secondaryText}>Meus simulados</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F8FC",
    padding: 24,
    gap: 14,
    justifyContent: "center",
    alignItems: "stretch",
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },
  kicker: { color: "#286D9B", fontSize: 12, fontWeight: "700", letterSpacing: 1 },
  title: { color: "#090B2B", fontSize: 28, fontWeight: "800" },
  subtitle: { color: "#667085", fontSize: 15, lineHeight: 22, marginBottom: 12 },
  primaryButton: { flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center", padding: 15, borderRadius: 12, backgroundColor: "#286D9B" },
  primaryText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  secondaryButton: { flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center", padding: 15, borderRadius: 12, borderWidth: 1, borderColor: "#B2DDFF", backgroundColor: "#FFFFFF" },
  secondaryText: { color: "#286D9B", fontSize: 15, fontWeight: "700" },
});
