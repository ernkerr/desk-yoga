import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";

export default function SessionComplete() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 justify-center items-center p-6">
        <Text className="text-4xl font-bold mb-4">Good job!</Text>
        <Pressable
          onPress={() => router.replace("/home")}
          className="mt-6 bg-black rounded-full px-10 py-4"
        >
          <Text className="text-white text-lg font-semibold">OK</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
