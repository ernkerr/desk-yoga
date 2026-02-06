import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SkipButtonProps = {
  onPress: () => void;
};

export function SkipButton({ onPress }: SkipButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="absolute bottom-16 right-6 z-10 p-2"
    >
      <Ionicons name="play-forward" size={24} color="#333" />
    </Pressable>
  );
}
