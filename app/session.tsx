import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { BackButton } from "@/src/components/BackButton";
import { getNextPose } from "@/src/utils/poseEngine";
import { addToHistory, clearHistory } from "@/src/utils/sessionHistory";
import type { Pose } from "@/src/types/pose";
import type { SessionConfig } from "@/src/types/session";

export default function Session() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Parse config from route params
  const config: SessionConfig = {
    mode: (params.mode as SessionConfig["mode"]) || "just stretch",
    posture: (params.posture as SessionConfig["posture"]) || "sitting",
    camera: params.camera as SessionConfig["camera"],
    focus_area: params.focus_area as SessionConfig["focus_area"],
    speed: (params.speed as SessionConfig["speed"]) || "slow",
    duration: Number(params.duration) || 5,
  };

  const [currentPose, setCurrentPose] = useState<Pose | null>(null);

  // Get first pose on mount
  useEffect(() => {
    clearHistory();
    const firstPose = getNextPose(config);
    if (firstPose) {
      setCurrentPose(firstPose);
      addToHistory(firstPose.id);
    }
  }, []);

  const handleNext = () => {
    const next = getNextPose(config, currentPose?.id);
    if (next) {
      setCurrentPose(next);
      addToHistory(next.id);
    }
  };

  const handleEnd = () => {
    clearHistory();
    router.back();
  };

  if (!currentPose) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text>No poses available for this configuration</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      <BackButton onPress={handleEnd} />

      <View className="flex-1 px-4">
        {/* Pose Image */}
        <View className="flex-1 items-center justify-center">
          <Image
            source={currentPose.image}
            className="w-64 h-64"
            resizeMode="contain"
          />
        </View>

        {/* Pose Info */}
        <View className="mb-4">
          <Text className="text-2xl font-bold text-center mb-2">
            {currentPose.name}
          </Text>
          <Text className="text-base text-gray-600 text-center">
            {currentPose.instructions}
          </Text>
        </View>

        {/* Next Button */}
        <Pressable
          onPress={handleNext}
          className="bg-black py-4 rounded-xl mb-4"
        >
          <Text className="text-white text-lg font-semibold text-center">
            Next Pose
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
