import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as icons from 'lucide-react-native'

type IconWrapperProps = {
  name: string
  size?: number
  color?: string
  fallbackText?: string
  fallbackColor?: string
}

const IconWrapper = ({
  name,
  size = 24,
  color = '#000',
  fallbackText = '?',
  fallbackColor = '#ccc'
}: IconWrapperProps) => {
  // Procura o ícone dentro do pacote lucide-react-native
  const LucideIcon = (icons as Record<string, any>)[name]

  // Se o ícone não existir ou der erro, renderiza o Fallback
  if (!LucideIcon) {
    return (
      <View
        style={[
          styles.fallbackContainer,
        ]}
      >
        <Text style={[styles.fallbackText, { fontSize: size * 0.5, color: fallbackColor }]}>
          {fallbackText}
        </Text>
      </View>
    )
  }

  // Renderiza o ícone do Lucide com as props corretas
  return <LucideIcon size={size} color={color} />
}

const styles = StyleSheet.create({
  fallbackContainer: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fallbackText: {
    fontWeight: 'bold'
  }
})

export default IconWrapper