import { Image, StyleSheet } from "react-native";

export function IntroductionIllustration() {
  return (
    <Image
      source={require("../../../../assets/images/introduction-illustration.png")}
      style={styles.illustration}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  illustration: {
    width: "100%",
    height: "100%",
  },
});