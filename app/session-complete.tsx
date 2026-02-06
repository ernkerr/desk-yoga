import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";

export default function SessionComplete() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 justify-center items-center p-6">
        <Text className="text-4xl font-bold mb-4">Well done!</Text>
        <Text className="text-lg text-gray-600 text-center">
          Great job completing your stretch session.
        </Text>
      </View>
    </SafeAreaView>
  );
}
