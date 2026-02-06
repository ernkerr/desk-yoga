import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SessionSettingsButtonProps = {
  onPress: () => void;
};

export function SessionSettingsButton({ onPress }: SessionSettingsButtonProps) {
  return (
    <Pressable onPress={onPress} className="absolute top-20 right-6 z-10 w-14 h-14 items-center justify-center">
      <Ionicons name="settings-outline" size={32} color="#333" />
    </Pressable>
  );
}
