import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { BackButton } from "@/src/components/BackButton";
import type { PosturePreference } from "@/src/types/pose";

export default function SessionSetupScreen() {
  const router = useRouter();

  const handlePosture = (selected: PosturePreference) => {
    router.push({
      pathname: "/session",
      params: {
        posture: selected,
        mode: "just stretch",
        poseDuration: 45,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      <BackButton onPress={() => router.back()} />

      <View className="flex-1 items-center justify-center px-6">
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
          <Pressable
            onPress={() => handlePosture("any")}
            className="flex-1 py-12 rounded-xl border-2 border-gray-200"
          >
            <Text className="text-xl font-semibold text-center">Any</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
