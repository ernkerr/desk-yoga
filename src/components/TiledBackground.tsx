import { ImageBackground } from "react-native";

type TiledBackgroundProps = {
  children?: React.ReactNode;
};

export function TiledBackground({ children }: TiledBackgroundProps) {
  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="repeat"
      style={{ flex: 1 }}
      imageStyle={{ resizeMode: "repeat" }}
    >
      {children}
    </ImageBackground>
  );
}
