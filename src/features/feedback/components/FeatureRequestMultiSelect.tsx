import React, { useMemo, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FEATURE_REQUEST_OPTIONS } from "../feedbackSurveyOptions";

type FeatureRequestMultiSelectProps = {
  selectedKeys: string[];
  onToggle: (key: string) => void;
  otherText: string;
  onOtherTextChange: (text: string) => void;
};

export function FeatureRequestMultiSelect({
  selectedKeys,
  onToggle,
  otherText,
  onOtherTextChange,
}: FeatureRequestMultiSelectProps) {
  const [isOtherFocused, setIsOtherFocused] = useState(false);
  const trimmedOther = useMemo(() => otherText.trim(), [otherText]);

  return (
    <View className="gap-2">
      {FEATURE_REQUEST_OPTIONS.map((option) => {
        const isSelected = selectedKeys.includes(option.key);
        return (
          <Pressable
            key={option.key}
            onPress={() => onToggle(option.key)}
            accessibilityRole="button"
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

              return (
                <View
                  className={`flex-row items-center justify-between rounded-full border-2 px-4 py-3 ${containerClassName}`}
                  style={pressed ? { transform: [{ scale: 0.99 }] } : undefined}
                >
                  <Text className={`flex-1 font-semibold ${textClassName}`}>
                    {option.label}
                  </Text>
                  {isSelected ? (
                    <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                  ) : null}
                </View>
              );
            }}
          </Pressable>
        );
      })}

      <View
        className={`flex-row items-center justify-between rounded-full border-2 px-4 py-3 bg-white ${
          trimmedOther
            ? "border-black"
            : isOtherFocused
              ? "border-gray-400"
              : "border-gray-200"
        }`}
      >
        <TextInput
          value={otherText}
          onChangeText={onOtherTextChange}
          placeholder="Other"
          placeholderTextColor="#6B7280"
          onFocus={() => setIsOtherFocused(true)}
          onBlur={() => setIsOtherFocused(false)}
          className="flex-1 font-semibold text-gray-700"
          autoCapitalize="sentences"
          autoCorrect
        />
        {trimmedOther ? (
          <Ionicons name="checkmark" size={20} color="#111827" />
        ) : null}
      </View>
    </View>
  );
}

