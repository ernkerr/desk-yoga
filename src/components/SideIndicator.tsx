import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";
import Svg, { Defs, RadialGradient, Stop, Circle } from "react-native-svg";
import type { Side } from "@/src/types/pose";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type SideIndicatorProps = {
  side?: Side;
};

const ACTIVE_COLOR = "#FDB474";
const INACTIVE_COLOR = "#D1D5DB";
const INACTIVE_BG = "#F3F4F6";

function PulsatingLight({ isActive }: { isActive: boolean }) {
  const glowOpacity = useSharedValue(0.8);
  const lightScale = useSharedValue(1);

  useEffect(() => {
    if (isActive) {
      // Start at a visible level, then begin pulsing
      glowOpacity.value = 0.8;
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.7, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
      lightScale.value = withRepeat(
        withSequence(
          withTiming(1.3, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    } else {
      glowOpacity.value = 0;
      lightScale.value = 1;
    }
  }, [isActive]);

  const animatedProps = useAnimatedProps(() => ({
    opacity: glowOpacity.value,
  }));

  const lightAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: lightScale.value }],
  }));

  return (
    <View style={styles.lightContainer}>
      {isActive && (
        <Svg width={32} height={32} style={styles.glowSvg}>
          <Defs>
            <RadialGradient id="glow" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={ACTIVE_COLOR} stopOpacity="1" />
              <Stop offset="30%" stopColor={ACTIVE_COLOR} stopOpacity="0.7" />
              <Stop offset="100%" stopColor={ACTIVE_COLOR} stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <AnimatedCircle
            cx="16"
            cy="16"
            r="16"
            fill="url(#glow)"
            animatedProps={animatedProps}
          />
        </Svg>
      )}
      <Animated.View style={[styles.light, isActive ? styles.lightActive : styles.lightInactive, isActive && lightAnimatedStyle]} />
    </View>
  );
}

export function SideIndicator({ side }: SideIndicatorProps) {
  if (!side) return null;

  const isLeftActive = side === "left";
  const isRightActive = side === "right";

  return (
    <View className="flex-row justify-between w-full px-4 py-3">
      {/* Left Pill */}
      <View
        style={[
          styles.pill,
          isLeftActive ? styles.pillActive : styles.pillInactive,
        ]}
      >
        <PulsatingLight isActive={isLeftActive} />
        <Text
          style={[
            styles.text,
            isLeftActive ? styles.textActive : styles.textInactive,
          ]}
        >
          Left
        </Text>
      </View>

      {/* Right Pill */}
      <View
        style={[
          styles.pill,
          isRightActive ? styles.pillActive : styles.pillInactive,
        ]}
      >
        <PulsatingLight isActive={isRightActive} />
        <Text
          style={[
            styles.text,
            isRightActive ? styles.textActive : styles.textInactive,
          ]}
        >
          Right
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 4,
  },
  pillActive: {
    backgroundColor: "rgba(253, 180, 116, 0.2)",
  },
  pillInactive: {
    backgroundColor: INACTIVE_BG,
  },
  lightContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  glowSvg: {
    position: "absolute",
  },
  light: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  lightActive: {
    backgroundColor: ACTIVE_COLOR,
  },
  lightInactive: {
    backgroundColor: INACTIVE_COLOR,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
  textActive: {
    color: "#92400E",
  },
  textInactive: {
    color: "#9CA3AF",
  },
});
