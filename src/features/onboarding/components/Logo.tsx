import { Image, StyleSheet } from "react-native";

interface LogoProps {
  width?: number;
  offsetX?: number;
}

export function Logo({ width = 120, offsetX = 0 }: LogoProps) {
  const height = width / 2;

  return (
    <Image
      source={require("../../../../assets/images/logo.png")}
      style={[
        styles.logo,
        {
          width,
          height,
          transform: [{ translateX: offsetX }],
        },
      ]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  logo: {},
});