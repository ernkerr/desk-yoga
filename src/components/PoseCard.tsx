import React from "react";
import { View, Text, Image } from "react-native";
import { SideIndicator } from "./SideIndicator";
import type { Pose } from "@/src/types/pose";

type PoseCardProps = {
  pose: Pose;
};

export function PoseCard({ pose }: PoseCardProps) {
  return (
    <View className="w-full justify-center items-center  px-4">
      {/* Pose Image */}
      <Image
        source={pose.image}
        className="w-full h-[500px] rounded-3xl"
        resizeMode="contain"
      />

      {/* Side Indicator - below pose image */}
      <SideIndicator side={pose.side} />

      {/* Pose Name */}
      <Text className="text-2xl text-center mb-4">{pose.name}</Text>

      {/* Instructions */}
      <Text className="text-base text-gray-600 text-center mb-8">
        {pose.instructions}
      </Text>
    </View>
  );
}
