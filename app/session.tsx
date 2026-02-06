import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { BackButton } from "@/src/components/BackButton";
import { SkipButton } from "@/src/components/SkipButton";
import { SessionSettingsButton } from "@/src/components/SessionSettingsButton";
import {
  PoseTransitionGlow,
  PoseTransitionGlowRef,
} from "@/src/components/PoseTransitionGlow";
import { PoseCard } from "@/src/components/PoseCard";
import { TiledBackground } from "@/src/components/TiledBackground";
import { getNextPose, triggerNextPose } from "@/src/utils/poseEngine";
import { addToHistory, clearHistory } from "@/src/utils/sessionHistory";
import { useTimer } from "@/src/utils/timerEngine";
import { useSessionDuration } from "@/src/utils/sessionDuration";
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
    poseDuration: params.poseDuration ? Number(params.poseDuration) : undefined,
    duration: Number(params.duration) || 5,
  };

  const [currentPose, setCurrentPose] = useState<Pose | null>(null);
  const glowRef = useRef<PoseTransitionGlowRef>(null);

  // Get first pose on mount
  useEffect(() => {
    clearHistory();
    const firstPose = getNextPose(config);
    if (firstPose) {
      setCurrentPose(firstPose);
      addToHistory(firstPose.id);
    }
  }, []);

  // Handle next pose (called by timer) - triggers glow first
  const handleNext = useCallback(() => {
    glowRef.current?.trigger();
  }, []);

  // Called when glow animation completes - advance to next pose
  const handleGlowComplete = useCallback(() => {
    triggerNextPose(config, currentPose?.id, setCurrentPose);
  }, [config, currentPose?.id]);

  // Timer auto-advances poses
  useTimer(config.speed, handleNext, config.poseDuration);

  const handleEnd = useCallback(() => {
    clearHistory();
    router.back();
  }, [router]);

  // End session when duration is reached
  useSessionDuration(config.duration, handleEnd);

  const handleEndPress = () => {
    clearHistory();
    router.back();
  };

  const handleSettingsPress = () => {
    router.push({
      pathname: "/session-settings",
      params: {
        ...config,
        poseDuration: config.poseDuration,
      },
    });
  };

  if (!currentPose) {
    return (
      <TiledBackground>
        <SafeAreaView className="flex-1 bg-transparent items-center justify-center">
          <Text>No poses available for this configuration</Text>
        </SafeAreaView>
      </TiledBackground>
    );
  }

  return (
    // <TiledBackground>
    <SafeAreaView className="flex-1 bg-transparent">
      <Stack.Screen options={{ headerShown: false }} />

      <BackButton onPress={handleEndPress} />
      <SessionSettingsButton onPress={handleSettingsPress} />
      <SkipButton onPress={() => triggerNextPose(config, currentPose?.id, setCurrentPose)} />

      {/* Speed Toggle - top right */}
      {/* <View className="absolute top-16 right-6 z-10">
        <SpeedToggle speed={speed} onSpeedChange={setSpeed} />
      </View> */}

      <View className="flex-1 justify-center items-center">
        <PoseCard pose={currentPose} />
      </View>

      <PoseTransitionGlow ref={glowRef} onComplete={handleGlowComplete} />
    </SafeAreaView>

    // </TiledBackground>
  );
}
