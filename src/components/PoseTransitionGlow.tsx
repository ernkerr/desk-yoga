import React, { forwardRef, useImperativeHandle, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  runOnJS,
} from "react-native-reanimated";

// Warm muted orange from tertiary palette (tertiary-300)
const GLOW_COLOR = "rgba(253, 180, 116, 1)";
const GLOW_COLOR_TRANSPARENT = "rgba(253, 180, 116, 0)";

const EDGE_SIZE = 120;

export interface PoseTransitionGlowRef {
  trigger: () => void;
}

export interface PoseTransitionGlowProps {
  onComplete?: () => void;
}

export const PoseTransitionGlow = forwardRef<
  PoseTransitionGlowRef,
  PoseTransitionGlowProps
>(function PoseTransitionGlow({ onComplete }, ref) {
  const opacity = useSharedValue(0);

  const handleComplete = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  const trigger = useCallback(() => {
    const peakOpacity = 0.6;
    const fadeInDuration = 400;
    const fadeOutDuration = 400;
    const delayBetween = 200;

    opacity.value = withSequence(
      // Pulse 1
      withTiming(peakOpacity, {
        duration: fadeInDuration,
        easing: Easing.out(Easing.ease),
      }),
      withTiming(0, {
        duration: fadeOutDuration,
        easing: Easing.in(Easing.ease),
      }),
      // Pulse 2
      withDelay(
        delayBetween,
        withTiming(peakOpacity, {
          duration: fadeInDuration,
          easing: Easing.out(Easing.ease),
        })
      ),
      withTiming(0, {
        duration: fadeOutDuration,
        easing: Easing.in(Easing.ease),
      }),
      // Pulse 3
      withDelay(
        delayBetween,
        withTiming(peakOpacity, {
          duration: fadeInDuration,
          easing: Easing.out(Easing.ease),
        })
      ),
      withTiming(
        0,
        {
          duration: fadeOutDuration,
          easing: Easing.in(Easing.ease),
        },
        (finished) => {
          if (finished) {
            runOnJS(handleComplete)();
          }
        }
      )
    );
  }, [handleComplete]);

  useImperativeHandle(ref, () => ({ trigger }), [trigger]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Top edge gradient */}
      <Animated.View style={[styles.topGradient, animatedStyle]}>
        <LinearGradient
          colors={[GLOW_COLOR, GLOW_COLOR_TRANSPARENT]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </Animated.View>

      {/* Bottom edge gradient */}
      <Animated.View style={[styles.bottomGradient, animatedStyle]}>
        <LinearGradient
          colors={[GLOW_COLOR_TRANSPARENT, GLOW_COLOR]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </Animated.View>

      {/* Left edge gradient */}
      <Animated.View style={[styles.leftGradient, animatedStyle]}>
        <LinearGradient
          colors={[GLOW_COLOR, GLOW_COLOR_TRANSPARENT]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
      </Animated.View>

      {/* Right edge gradient */}
      <Animated.View style={[styles.rightGradient, animatedStyle]}>
        <LinearGradient
          colors={[GLOW_COLOR_TRANSPARENT, GLOW_COLOR]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: EDGE_SIZE,
  },
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: EDGE_SIZE,
  },
  leftGradient: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: EDGE_SIZE,
  },
  rightGradient: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: EDGE_SIZE,
  },
});
