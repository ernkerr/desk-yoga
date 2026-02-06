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
    <Pressable onPress={handlePress} className="absolute top-20 left-6 z-10 w-14 h-14 items-center justify-center">
      <Ionicons name="arrow-back" size={32} color="#333" />
    </Pressable>
  );
}
