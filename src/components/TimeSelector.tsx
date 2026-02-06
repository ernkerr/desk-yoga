import { View, Text, Pressable } from "react-native";

type Preset = {
  value: number;
  label: string;
};

type TimeSelectorProps = {
  presets: Preset[];
  value: number;
  onChange: (value: number) => void;
  isCustom: boolean;
  onCustomToggle: (isCustom: boolean) => void;
  unit: string;
  min?: number;
  max?: number;
  step?: number;
};

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return hours === 1 ? "1 hour" : `${hours} hours`;
  }
  const hourPart = hours === 1 ? "1 hour" : `${hours} hours`;
  const minPart = mins === 1 ? "1 min" : `${mins} min`;
  return `${hourPart} ${minPart}`;
}

export function TimeSelector({
  presets,
  value,
  onChange,
  isCustom,
  onCustomToggle,
  unit,
  min = 1,
  max = 999,
  step = 5,
}: TimeSelectorProps) {
  const handlePresetPress = (preset: Preset) => {
    onCustomToggle(false);
    onChange(preset.value);
  };

  const handleCustomPress = () => {
    onCustomToggle(true);
  };

  const increment = () => {
    const newValue = Math.min(value + step, max);
    onChange(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(value - step, min);
    onChange(newValue);
  };

  // Format display value for custom stepper
  const displayValue = unit === "minutes" ? formatDuration(value) : `${value}`;
  const showUnit = unit === "minutes" && value < 60;

  return (
    <View className="w-full">
      <View className="flex-row flex-wrap gap-2 mb-2">
        {presets.map((preset) => {
          const isSelected = !isCustom && value === preset.value;
          return (
            <Pressable
              key={preset.value}
              onPress={() => handlePresetPress(preset)}
              className={`flex-1 min-w-[70px] py-3 rounded-lg border-2 ${
                isSelected
                  ? "bg-black border-black"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`font-semibold text-center ${
                  isSelected ? "text-white" : "text-gray-700"
                }`}
              >
                {preset.label}
              </Text>
            </Pressable>
          );
        })}
        <Pressable
          onPress={handleCustomPress}
          className={`flex-1 min-w-[70px] py-3 rounded-lg border-2 ${
            isCustom ? "bg-black border-black" : "bg-white border-gray-200"
          }`}
        >
          <Text
            className={`font-semibold text-center ${
              isCustom ? "text-white" : "text-gray-700"
            }`}
          >
            Custom
          </Text>
        </Pressable>
      </View>

      {isCustom && (
        <View className="flex-row items-center justify-center gap-4 mt-3 py-2">
          <Pressable
            onPress={decrement}
            className="w-12 h-12 rounded-full border-2 border-gray-300 items-center justify-center bg-white"
          >
            <Text className="text-2xl font-bold text-gray-600">-</Text>
          </Pressable>
          <View className="min-w-[100px] items-center">
            <Text className="text-3xl font-bold text-center">{displayValue}</Text>
            {showUnit && <Text className="text-gray-500 text-sm">{unit}</Text>}
          </View>
          <Pressable
            onPress={increment}
            className="w-12 h-12 rounded-full border-2 border-gray-300 items-center justify-center bg-white"
          >
            <Text className="text-2xl font-bold text-gray-600">+</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
