import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ENJOYMENT_OPTIONS, type Enjoyment } from "../feedbackSurveyOptions";

type EnjoymentButtonsProps = {
  value: Enjoyment | null;
  onChange: (value: Enjoyment) => void;
};

export function EnjoymentButtons({ value, onChange }: EnjoymentButtonsProps) {
  return (
    <View className="flex-row gap-2">
      {ENJOYMENT_OPTIONS.map((option) => {
        const isSelected = value === option.key;
        return (
          <Pressable
            key={option.key}
            onPress={() => onChange(option.key)}
            accessibilityRole="button"
            className="flex-1"
          >
            {({ pressed }) => {
              const containerClassName = isSelected
                ? pressed
                  ? "bg-gray-900 border-gray-900"
                  : "bg-black border-black"
                : pressed
                  ? "bg-gray-50 border-gray-400"
                  : "bg-white border-gray-200";

              const textClassName = isSelected
                ? "text-white"
                : pressed
                  ? "text-gray-800"
                  : "text-gray-700";

              const iconColor = isSelected
                ? "#FFFFFF"
                : pressed
                  ? "#111827"
                  : "#374151";

              return (
                <View
                  className={`items-center justify-center rounded-2xl border-2 px-3 py-4 ${containerClassName}`}
                  style={pressed ? { transform: [{ scale: 0.99 }] } : undefined}
                >
                  <Ionicons
                    name={option.icon as any}
                    size={30}
                    color={iconColor}
                  />
                  <Text className={`mt-2 font-semibold ${textClassName}`}>
                    {option.label}
                  </Text>
                </View>
              );
            }}
          </Pressable>
        );
      })}
    </View>
  );
}

