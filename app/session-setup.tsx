import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "@ui/button";
import type { AllowedPosture } from "@/src/types/pose";
import type { SessionConfig } from "@/src/types/session";

type PostureOption = {
  value: AllowedPosture;
  label: string;
  description: string;
};

type DurationOption = {
  value: number;
  label: string;
  description: string;
};

const POSTURE_OPTIONS: PostureOption[] = [
  {
    value: "sitting",
    label: "Sitting",

    description: "Stretches you can do at your desk",
  },
  {
    value: "standing",
    label: "Standing",
    description: "Stretches that use more space",
  },
];

const DURATION_OPTIONS: DurationOption[] = [
  {
    value: 2,
    label: "2 minutes",
    description: "Between meetings",
  },
  {
    value: 5,
    label: "5 minutes",
    description: "Quick break",
  },
  {
    value: 10,
    label: "10 minutes",
    description: "Good stretch",
  },
  {
    value: 10,
    label: "10 minutes",
    description: "Deep stretch",
  },
];

type Step = "posture" | "duration";

export default function SessionSetupScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("posture");
  const [posture, setPosture] = useState<AllowedPosture | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  const handleContinue = () => {
    if (step === "posture" && posture) {
      setStep("duration");
      return;
    }

    if (step === "duration" && duration) {
      const config: Partial<SessionConfig> = {
        posture: posture!,
        mode: "just stretch",
        speed: "slow",
        duration,
      };

      // TODO: Navigate to session screen with config
      // router.push({ pathname: "/session", params: { config: JSON.stringify(config) } });
      console.log("Starting session with config:", config);
    }
  };

  const handleBack = () => {
    if (step === "duration") {
      setStep("posture");
    } else {
      router.back();
    }
  };

  const canContinue =
    (step === "posture" && posture !== null) ||
    (step === "duration" && duration !== null);

  const buttonLabel = step === "duration" ? "Start Session" : "Continue";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: true,
          title: "New Session",
          headerLeft: () => (
            <Pressable onPress={handleBack} className="p-2">
              <Ionicons
                name={step === "posture" ? "close" : "arrow-back"}
                size={24}
                color="#333"
              />
            </Pressable>
          ),
        }}
      />

      <View className="flex-1 p-4">
        {step === "posture" && (
          <>
            <Text className="text-xl font-semibold mb-2">
              How will you be stretching?
            </Text>
            <Text className="text-gray-500 mb-6">
              We'll show poses that work for your position
            </Text>

            <View className="gap-3">
              {POSTURE_OPTIONS.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => setPosture(option.value)}
                  className={`p-4 rounded-lg border-2 ${
                    posture === option.value
                      ? "border-[#26ABFF] bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <View className="flex-row items-center">
                    <View className="flex-1">
                      <Text className="text-lg font-medium">
                        {option.label}
                      </Text>
                      <Text className="text-gray-500">
                        {option.description}
                      </Text>
                    </View>
                    {posture === option.value && (
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#26ABFF"
                      />
                    )}
                  </View>
                </Pressable>
              ))}
            </View>
          </>
        )}

        {step === "duration" && (
          <>
            <Text className="text-xl font-semibold mb-2">
              How long do you have?
            </Text>
            <Text className="text-gray-500 mb-6">
              Choose a duration for your stretch session
            </Text>

            <View className="gap-3">
              {DURATION_OPTIONS.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => setDuration(option.value)}
                  className={`p-4 rounded-lg border-2 ${
                    duration === option.value
                      ? "border-[#26ABFF] bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <View className="flex-row items-center">
                    <View className="flex-1">
                      <Text className="text-lg font-medium">
                        {option.label}
                      </Text>
                      <Text className="text-gray-500">
                        {option.description}
                      </Text>
                    </View>
                    {duration === option.value && (
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#26ABFF"
                      />
                    )}
                  </View>
                </Pressable>
              ))}
            </View>
          </>
        )}
      </View>

      <View className="p-4 border-t border-gray-200">
        <Button
          size="lg"
          action="primary"
          className="w-full"
          disabled={!canContinue}
          onPress={handleContinue}
        >
          <ButtonText>{buttonLabel}</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}
