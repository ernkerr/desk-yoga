import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { BackButton } from "@/src/components/BackButton";
import { TimeSelector } from "@/src/components/TimeSelector";
import { Button, ButtonText } from "@/src/components/ui/button";

export default function SessionSetupScreen() {
  const router = useRouter();
  const [step, setStep] = useState<"posture" | "duration">("posture");
  const [posture, setPosture] = useState<"sitting" | "standing">();
  const [duration, setDuration] = useState(5);
  const [isCustomDuration, setIsCustomDuration] = useState(false);

  const handleBack = () => {
    if (step === "duration") {
      setStep("posture");
    } else {
      router.back();
    }
  };

  const handlePosture = (selected: "sitting" | "standing") => {
    setPosture(selected);
    setStep("duration");
  };

  const handleStart = () => {
    router.push({
      pathname: "/session",
      params: {
        posture,
        duration,
        mode: "just stretch",
        poseDuration: 45,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      <BackButton onPress={handleBack} />

      <View className="flex-1 items-center justify-center px-6">
        {step === "posture" && (
          <View className="flex-row gap-4 w-full">
            <Pressable
              onPress={() => handlePosture("sitting")}
              className="flex-1 py-12 rounded-xl border-2 border-gray-200"
            >
              <Text className="text-xl font-semibold text-center">Sitting</Text>
            </Pressable>
            <Pressable
              onPress={() => handlePosture("standing")}
              className="flex-1 py-12 rounded-xl border-2 border-gray-200"
            >
              <Text className="text-xl font-semibold text-center">
                Standing
              </Text>
            </Pressable>
          </View>
        )}

        {step === "duration" && (
          <View className="w-full px-4">
            <Text className="text-xl font-semibold text-center mb-6">
              How long?
            </Text>
            <TimeSelector
              presets={[
                { value: 2, label: "2 min" },
                { value: 5, label: "5 min" },
                { value: 10, label: "10 min" },
                { value: 30, label: "30 min" },
                { value: 45, label: "45 min" },
                { value: 60, label: "1 hour" },
                { value: 90, label: "1.5 hours" },
                { value: 120, label: "2 hours" },
              ]}
              value={duration}
              onChange={setDuration}
              isCustom={isCustomDuration}
              onCustomToggle={setIsCustomDuration}
              unit="minutes"
              min={1}
              max={120}
              step={1}
            />
          </View>
        )}
      </View>

      {step === "duration" && (
        <View className="px-6 pb-6">
          <Button
            size="xl"
            action="primary"
            onPress={handleStart}
            className="w-full"
            style={{ boxShadow: "4px 4px 0px #000" }}
          >
            <ButtonText>Start</ButtonText>
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}
