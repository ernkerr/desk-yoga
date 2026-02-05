import { View, Text, Pressable } from "react-native";
import type { SessionConfig } from "@/src/types/session";

type SpeedToggleProps = {
  speed: SessionConfig["speed"];
  onSpeedChange: (speed: SessionConfig["speed"]) => void;
};

const speeds: SessionConfig["speed"][] = ["still", "slow", "flow"];

export function SpeedToggle({ speed, onSpeedChange }: SpeedToggleProps) {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-full p-1">
      {speeds.map((s) => (
        <Pressable
          key={s}
          onPress={() => onSpeedChange(s)}
          className={`px-4 py-2 rounded-full ${speed === s ? "bg-black" : ""}`}
        >
          <Text
            className={
              speed === s ? "text-white font-semibold" : "text-gray-500"
            }
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
