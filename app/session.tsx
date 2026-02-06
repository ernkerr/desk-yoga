import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { BackButton } from "@/src/components/BackButton";
import { SessionSettingsButton } from "@/src/components/SessionSettingsButton";
import {
  PoseTransitionGlow,
  PoseTransitionGlowRef,
} from "@/src/components/PoseTransitionGlow";
import { PoseCard } from "@/src/components/PoseCard";
import { TiledBackground } from "@/src/components/TiledBackground";
import { getNextPose, triggerNextPose, getPoseById } from "@/src/utils/poseEngine";
import { addToHistory, clearHistory, getHistory, popFromHistory } from "@/src/utils/sessionHistory";
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
  const [isPaused, setIsPaused] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [redoClickCount, setRedoClickCount] = useState(0);
  const glowRef = useRef<PoseTransitionGlowRef>(null);
  const redoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  useTimer(config.speed, handleNext, config.poseDuration, isPaused, resetTrigger);

  const handleRedo = () => {
    if (redoClickCount === 0) {
      // First click: reset pose timer
      setResetTrigger((t) => t + 1);
      setRedoClickCount(1);
      redoTimeoutRef.current = setTimeout(() => setRedoClickCount(0), 2000);
    } else {
      // Second click: go back one pose
      if (redoTimeoutRef.current) clearTimeout(redoTimeoutRef.current);
      setRedoClickCount(0);
      const history = getHistory();
      if (history.length >= 2) {
        popFromHistory(); // remove current
        const prevId = popFromHistory(); // get previous
        if (prevId) {
          const prevPose = getPoseById(prevId);
          if (prevPose) {
            setCurrentPose(prevPose);
            addToHistory(prevId); // re-add to history
            setResetTrigger((t) => t + 1); // reset timer
          }
        }
      }
    }
  };

  const handleEnd = useCallback(() => {
    clearHistory();
    router.back();
  }, [router]);

  // End session when duration is reached
  useSessionDuration(config.duration, handleEnd, isPaused);

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

      <View className="flex-1 justify-center items-center">
        <PoseCard pose={currentPose} />
      </View>

      {/* Bottom control bar */}
      <View className="absolute bottom-20 left-0 right-0 flex-row justify-between px-6 z-10">
        <Pressable onPress={handleRedo} className="w-14 h-14 items-center justify-center">
          <Ionicons name="refresh" size={32} color="#333" />
        </Pressable>
        <Pressable onPress={() => setIsPaused(!isPaused)} className="w-14 h-14 items-center justify-center">
          <Ionicons name={isPaused ? "play" : "pause"} size={32} color="#333" />
        </Pressable>
        <Pressable onPress={() => triggerNextPose(config, currentPose?.id, setCurrentPose)} className="w-14 h-14 items-center justify-center">
          <Ionicons name="play-forward" size={32} color="#333" />
        </Pressable>
      </View>

      <PoseTransitionGlow ref={glowRef} onComplete={handleGlowComplete} />
    </SafeAreaView>

    // </TiledBackground>
  );
}
