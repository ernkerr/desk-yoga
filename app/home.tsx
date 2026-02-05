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
import { APP_CONFIG } from "@config/app.config";
import { PRESETS } from "@/src/types/presets";
import { getUserName } from "@/src/utils/storage";

export default function HomeScreen() {
  const router = useRouter();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="flex-1">
        <View className="flex-1 p-4">
          <View className="flex-row justify-end mb-2">
            <Pressable onPress={() => router.push("/settings")} className="p-2">
              <Ionicons name="settings-outline" size={24} />
            </Pressable>
          </View>
          <View className="mb-4 items-center">
            {/* <Text className="text-2xl font-bold mb-2 text-center">
              {APP_CONFIG.displayName}
            </Text> */}
            {/* <Text className="text-base text-gray-600 text-center">
              {APP_CONFIG.tagline}
            </Text> */}
            <Text>
              {getGreeting()}, {getUserName()}
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
                router.push({
                  pathname: "/session",
                  params: preset.config,
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
                  </View>
                </ImageBackground>
              ) : (
                <View className="p-4 mb-3 h-32 justify-end border border-gray-200 rounded-lg bg-gray-100">
                  <Text className="text-base font-medium">{preset.name}</Text>
                  <Text className="text-sm text-gray-500">
                    {preset.description}
                  </Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
