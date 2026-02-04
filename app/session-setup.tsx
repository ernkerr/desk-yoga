import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { BackButton } from "@/src/components/BackButton";

export default function SessionSetupScreen() {
  const router = useRouter();
  const [step, setStep] = useState<"posture" | "duration">("posture");
  const [posture, setPosture] = useState<"sitting" | "standing" | null>(null);

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

  const handleDuration = (minutes: number) => {
    console.log("Starting session:", { posture, duration: minutes });
    // TODO: Navigate to session
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
              <Text className="text-xl font-semibold text-center">Standing</Text>
            </Pressable>
          </View>
        )}

        {step === "duration" && (
          <View className="flex-row flex-wrap gap-4 justify-center">
            <Pressable
              onPress={() => handleDuration(2)}
              className="w-[45%] py-12 rounded-xl border-2 border-gray-200"
            >
              <Text className="text-xl font-semibold text-center">2 min</Text>
            </Pressable>
            <Pressable
              onPress={() => handleDuration(5)}
              className="w-[45%] py-12 rounded-xl border-2 border-gray-200"
            >
              <Text className="text-xl font-semibold text-center">5 min</Text>
            </Pressable>
            <Pressable
              onPress={() => handleDuration(10)}
              className="w-[45%] py-12 rounded-xl border-2 border-gray-200"
            >
              <Text className="text-xl font-semibold text-center">10 min</Text>
            </Pressable>
            <Pressable
              onPress={() => handleDuration(30)}
              className="w-[45%] py-12 rounded-xl border-2 border-gray-200"
            >
              <Text className="text-xl font-semibold text-center">30 min</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
