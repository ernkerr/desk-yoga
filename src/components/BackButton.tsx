import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type BackButtonProps = {
  to?: string; // Route to navigate to, or goes back if not provided
  onPress?: () => void; // Custom handler (overrides `to`)
};

export function BackButton({ to, onPress }: BackButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (to) {
      router.push(to as any);
    } else {
      router.back();
    }
  };

  return (
    <Pressable onPress={handlePress} className="absolute top-16 left-6 z-10 p-2">
      <Ionicons name="arrow-back" size={24} color="#333" />
    </Pressable>
  );
}
