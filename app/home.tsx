import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { Button, ButtonText } from "@ui/button";
import { Ionicons } from "@expo/vector-icons";
import { PRESETS } from "@/src/types/presets";
import { getUserName, getHasPaid } from "@/src/utils/storage";

export default function HomeScreen() {
  const router = useRouter();
  const isPaid = getHasPaid();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 p-4">
          <View className="flex-row justify-end mb-2">
            <Pressable onPress={() => router.push("/settings")} className="p-2">
              <Ionicons name="settings-outline" size={24} />
            </Pressable>
          </View>
          <View className="mb-4 items-center">
            <Text className="text-2xl font-bold mb-2 text-center">
              {getGreeting()}, {getUserName()}
            </Text>
            <Text className="text-base text-gray-600 text-center">
              Ready to feel better?
            </Text>
          </View>

          <Button
            size="lg"
            action="primary"
            className="w-full mb-4"
            onPress={() => router.push("/session-setup")}
          >
            <ButtonText>Start Session</ButtonText>
          </Button>

          {PRESETS.map((preset) => (
            <Pressable
              key={preset.id}
              onPress={() => {
                if (!isPaid) {
                  router.push("/paywall");
                  return;
                }
                router.push({
                  pathname: "/session",
                  params: {
                    ...preset.config,
                    presetId: preset.id,
                  },
                });
              }}
            >
              {preset.image ? (
                <ImageBackground
                  source={preset.image}
                  className="mb-3 rounded-lg overflow-hidden"
                  imageStyle={{ borderRadius: 8 }}
                >
                  <View className="p-4 h-32 justify-end bg-black/40">
                    <Text className="text-base font-medium text-white">
                      {preset.name}
                    </Text>
                    <Text className="text-sm text-white/80">
                      {preset.description}
                    </Text>
                    {!isPaid && (
                      <View className="absolute top-3 right-3">
                        <Ionicons name="lock-closed" size={18} color="white" />
                      </View>
                    )}
                  </View>
                </ImageBackground>
              ) : (
                <View className="p-4 mb-3 h-32 justify-end border border-gray-200 rounded-lg bg-gray-100">
                  <Text className="text-base font-medium">{preset.name}</Text>
                  <Text className="text-sm text-gray-500">
                    {preset.description}
                  </Text>
                  {!isPaid && (
                    <View className="absolute top-3 right-3">
                      <Ionicons name="lock-closed" size={18} color="#999" />
                    </View>
                  )}
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
