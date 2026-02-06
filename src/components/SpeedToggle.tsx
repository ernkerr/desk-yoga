import { View, Text, Pressable, TextInput } from "react-native";
import type { SessionConfig } from "@/src/types/session";

type SpeedToggleProps = {
  speed: SessionConfig["speed"];
  onSpeedChange: (speed: SessionConfig["speed"]) => void;
  customDuration?: number;
  onCustomDurationChange?: (seconds: number) => void;
};

const speedOptions: {
  value: SessionConfig["speed"];
  label: string;
  seconds: number;
}[] = [
  { value: "still", label: "Still", seconds: 60 },
  { value: "slow", label: "Slow", seconds: 45 },
  { value: "flow", label: "Flow", seconds: 30 },
];

export function SpeedToggle({
  speed,
  onSpeedChange,
  customDuration = 40,
  onCustomDurationChange,
}: SpeedToggleProps) {
  return (
    <View className="w-full">
      <View className="flex-row flex-wrap gap-2 mb-3">
        {speedOptions.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => onSpeedChange(option.value)}
            className={`flex-1 min-w-[70px] py-3 rounded-lg border-2 ${
              speed === option.value
                ? "bg-black border-black"
                : "bg-white border-gray-200"
            }`}
          >
            <Text
              className={`font-semibold text-center ${
                speed === option.value ? "text-white" : "text-gray-700"
              }`}
            >
              {option.label}
            </Text>
            <Text
              className={`text-xs text-center mt-1 ${
                speed === option.value ? "text-gray-300" : "text-gray-400"
              }`}
            >
              {option.seconds}s
            </Text>
          </Pressable>
        ))}
        <Pressable
          onPress={() => onSpeedChange("custom")}
          className={`flex-1 min-w-[70px] py-3 rounded-lg border-2 ${
            speed === "custom"
              ? "bg-black border-black"
              : "bg-white border-gray-200"
          }`}
        >
          <Text
            className={`font-semibold text-center ${
              speed === "custom" ? "text-white" : "text-gray-700"
            }`}
          >
            Custom
          </Text>
          <Text
            className={`text-xs text-center mt-1 ${
              speed === "custom" ? "text-gray-300" : "text-gray-400"
            }`}
          >
            {customDuration}s
          </Text>
        </Pressable>
      </View>

      {speed === "custom" && (
        <View className="flex-row items-center justify-center gap-3 mt-2">
          <Text className="text-gray-600">Seconds per pose:</Text>
          <TextInput
            value={String(customDuration)}
            onChangeText={(text) => {
              const num = parseInt(text, 10);
              if (!isNaN(num) && num > 0 && onCustomDurationChange) {
                onCustomDurationChange(num);
              }
            }}
            keyboardType="number-pad"
            className="border-2 border-gray-300 rounded-lg px-3 py-2 w-20 text-center font-semibold"
            maxLength={3}
          />
        </View>
      )}
    </View>
  );
}
