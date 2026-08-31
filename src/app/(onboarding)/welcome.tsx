import React from 'react';
import { useRouter } from 'expo-router';
import { WelcomeScreen } from '@/src/features/onboarding/screens/WelcomeScreen';

export default function Welcome() {
  const router = useRouter();

  const handleStartPress = () => {
    router.push('/introduction');
  };

  const handleLoginPress = () => {
    console.log('Navegar para login');
  };

  return (
    <WelcomeScreen
      onStartPress={handleStartPress}
      onLoginPress={handleLoginPress}
    />
  );
}