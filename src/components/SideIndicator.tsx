import React from "react";
import { View, Text } from "react-native";
import type { Side } from "@/src/types/pose";

type SideIndicatorProps = {
  side?: Side;
};

export function SideIndicator({ side }: SideIndicatorProps) {
  if (!side) return null;

  return (
    <View
      className={`w-full py-2 ${side === "right" ? "items-end" : "items-start"}`}
    >
      <Text className="text-sm text-gray-500">
        {side === "right" ? "Right Side" : "Left Side"}
      </Text>
    </View>
  );
}
