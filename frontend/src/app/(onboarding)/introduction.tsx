import { IntroductionScreen } from "@/src/features/onboarding/screens/IntroductionScreen";
import { useRouter } from "expo-router";

export default function Introduction() {
  const router = useRouter();

  return (
    <IntroductionScreen
      onLoginPress={() => router.push("/login")}
      onStartPress={() => router.push("/mock-exam")}
    />
  );
}
