import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
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
import {
  getNextPose,
  triggerNextPose,
  getPoseById,
} from "@/src/utils/poseEngine";
import {
  addToHistory,
  clearHistory,
  getHistory,
  popFromHistory,
} from "@/src/utils/sessionHistory";
import {
  preloadTransitionSound,
  playTransitionSound,
  unloadTransitionSound,
} from "@/src/utils/audio";
import { usePoseTimer } from "@/src/utils/poseTimer";
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
    presetId: params.presetId as string | undefined,
  };

  // --- State ---
  const [currentPose, setCurrentPose] = useState<Pose | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0); // incremented to reset pose timer (e.g. going back)
  const glowRef = useRef<PoseTransitionGlowRef>(null);
  const poseCardOpacity = useSharedValue(1);

  const poseCardStyle = useAnimatedStyle(() => ({
    opacity: poseCardOpacity.value,
  }));

  // --- Initialization ---

  // Pick the first pose and clear any leftover history
  useEffect(() => {
    clearHistory();
    const firstPose = getNextPose(config);
    if (firstPose) {
      setCurrentPose(firstPose);
      addToHistory(firstPose.id);
    }
  }, []);

  // Preload transition sound on mount, unload on unmount
  useEffect(() => {
    preloadTransitionSound();
    return () => {
      unloadTransitionSound();
    };
  }, []);

  // --- Session end ---
  // Called when session duration expires OR when the pose sequence is exhausted
  const handleEnd = useCallback(() => {
    clearHistory();
    router.replace("/session-complete");
  }, [router]);

  // --- Pose transitions ---
  // Step 1: Pose timer fires → trigger the glow overlay animation
  const handleNext = useCallback(() => {
    glowRef.current?.trigger();
  }, []);

  // Step 2: Glow starts fading in → fade out the current pose card
  const handleFadeOutStart = useCallback(() => {
    poseCardOpacity.value = withTiming(0, {
      duration: 250,
      easing: Easing.in(Easing.ease),
    });
  }, []);

  // Step 3: Glow at peak → swap to the next pose and fade in the new card
  const handlePoseChange = useCallback(() => {
    // Play transition sound if enabled
    playTransitionSound();

    const hasNext = triggerNextPose(config, currentPose?.id, setCurrentPose);
    if (!hasNext) {
      handleEnd();
    }
    // Fade in the new pose card
    poseCardOpacity.value = withTiming(1, {
      duration: 350,
      easing: Easing.out(Easing.ease),
    });
  }, [config, currentPose?.id, handleEnd]);

  // --- Timers (run independently) ---
  // Pose timer: counts down per pose, calls handleNext when it reaches zero
  usePoseTimer(
    config.speed,
    handleNext,
    config.poseDuration,
    isPaused,
    resetTrigger,
  );

  // --- Controls ---
  // Go back to the previous pose and reset the pose timer
  const handleBack = () => {
    const history = getHistory();
    if (history.length >= 2) {
      popFromHistory(); // remove current
      const prevId = popFromHistory(); // get previous
      if (prevId) {
        const prevPose = getPoseById(prevId);
        if (prevPose) {
          setCurrentPose(prevPose);
          addToHistory(prevId); // re-add to history
          setResetTrigger((t) => t + 1); // reset timer for new pose
        }
      }
    }
  };

  // Session timer: ends the entire session when the configured duration expires
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
      <SafeAreaView className="flex-1 bg-transparent items-center justify-center">
        <Text>No poses available for this configuration</Text>
      </SafeAreaView>
    );
  }

  return (
    // <TiledBackground>
    <SafeAreaView className="flex-1 bg-transparent">
      <Stack.Screen options={{ headerShown: false }} />

      <BackButton onPress={handleEndPress} />
      <SessionSettingsButton onPress={handleSettingsPress} />

      <View className="flex-1 justify-center items-center">
        <Animated.View style={poseCardStyle}>
          <PoseCard pose={currentPose} />
        </Animated.View>
      </View>

      {/* Bottom control bar */}
      <View className="absolute bottom-20 left-0 right-0 flex-row justify-between px-6 z-10">
        <Pressable
          onPress={handleBack}
          className="w-14 h-14 items-center justify-center"
        >
          <Ionicons name="play-forward" size={32} color="#333" style={{ transform: [{ scaleX: -1 }] }} />
        </Pressable>
        <Pressable
          onPress={() => setIsPaused(!isPaused)}
          className="w-14 h-14 items-center justify-center"
        >
          <Ionicons name={isPaused ? "play" : "pause"} size={32} color="#333" />
        </Pressable>
        <Pressable
          onPress={() => {
            playTransitionSound();
            const hasNext = triggerNextPose(
              config,
              currentPose?.id,
              setCurrentPose,
            );
            if (!hasNext) handleEnd();
          }}
          className="w-14 h-14 items-center justify-center"
        >
          <Ionicons name="play-forward" size={32} color="#333" />
        </Pressable>
      </View>

      <PoseTransitionGlow
        ref={glowRef}
        isPaused={isPaused}
        onFadeOutStart={handleFadeOutStart}
        onPoseChange={handlePoseChange}
      />
    </SafeAreaView>

    // </TiledBackground>
  );
}
