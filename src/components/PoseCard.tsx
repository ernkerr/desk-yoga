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
      <View className="w-[420px] h-[420px] rounded-3xl overflow-hidden">
        <Image
          source={pose.image}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Side Indicator - below pose image */}
      <SideIndicator side={pose.side} />

      {/* Pose Name */}
      <Text className="text-2xl text-center mb-4">{pose.name}</Text>

      {/* Instructions */}
      <View className="mb-8">
        {pose.instructions
          .split(".")
          .filter((sentence) => sentence.trim())
          .map((sentence, index) => (
            <Text key={index} className="text-base text-gray-600 text-center">
              {sentence.trim()}.
            </Text>
          ))}
      </View>
    </View>
  );
}
