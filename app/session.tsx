import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { BackButton } from "@/src/components/BackButton";
import { SpeedToggle } from "@/src/components/SpeedToggle";
import { getNextPose, triggerNextPose } from "@/src/utils/poseEngine";
import { addToHistory, clearHistory } from "@/src/utils/sessionHistory";
import { useTimer } from "@/src/utils/timerEngine";
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
  const [speed, setSpeed] = useState<SessionConfig["speed"]>("slow");

  // Get first pose on mount
  useEffect(() => {
    clearHistory();
    const firstPose = getNextPose(config);
    if (firstPose) {
      setCurrentPose(firstPose);
      addToHistory(firstPose.id);
    }
  }, []);

  // Handle next pose (called by timer)
  const handleNext = useCallback(() => {
    triggerNextPose(config, currentPose?.id, setCurrentPose);
  }, [config, currentPose?.id]);

  // Timer auto-advances poses
  useTimer(speed, handleNext);

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

      {/* Speed Toggle - top right */}
      <View className="absolute top-16 right-6 z-10">
        <SpeedToggle speed={speed} onSpeedChange={setSpeed} />
      </View>

      <View className="flex-1 px-4 pt-16">
        {/* Pose Image */}
        <View className="flex-1 items-center justify-center">
          <Image
            source={currentPose.image}
            className="w-64 h-64"
            resizeMode="contain"
          />
        </View>

        {/* Pose Info */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-center mb-2">
            {currentPose.name}
          </Text>
          <Text className="text-base text-gray-600 text-center">
            {currentPose.instructions}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
