import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SessionSettingsButtonProps = {
  onPress: () => void;
};

export function SessionSettingsButton({ onPress }: SessionSettingsButtonProps) {
  return (
    <Pressable onPress={onPress} className="absolute top-16 right-6 z-10 p-2">
      <Ionicons name="settings-outline" size={24} color="#333" />
    </Pressable>
  );
}
