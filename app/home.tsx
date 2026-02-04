import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { Button, ButtonText } from "@ui/button";
import { Ionicons } from "@expo/vector-icons";
import { APP_CONFIG } from "@config/app.config";
import { PRESETS } from "@/src/types/presets";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="flex-1">
        <View className="flex-1 p-4">
          <View className="flex-row justify-end mb-2">
            <Pressable onPress={() => router.push("/settings")} className="p-2">
              <Ionicons name="settings-outline" size={24} color="#333" />
            </Pressable>
          </View>
          <View className="mb-4 items-center">
            <Text className="text-2xl font-bold mb-2 text-center">
              {APP_CONFIG.displayName}
            </Text>
            <Text className="text-base text-gray-600 text-center">
              {APP_CONFIG.tagline}
            </Text>
          </View>

          <Button
            size="lg"
            action="primary"
            className="w-full mb-4"
            onPress={() => {
              // TODO: Start session flow
            }}
          >
            <ButtonText>Start Session</ButtonText>
          </Button>

          <Text className="text-lg font-semibold mt-4 mb-2">Quick Relief</Text>

          {PRESETS.map((preset) => (
            <Pressable
              key={preset.id}
              onPress={() => {
                // TODO: Start session with preset.config
              }}
            >
              <View className="p-4 mb-3 flex-row items-center border border-gray-200 rounded-lg">
                <Text className="text-2xl mr-3">{preset.icon}</Text>
                <View className="flex-1">
                  <Text className="text-base font-medium">{preset.name}</Text>
                  <Text className="text-sm text-gray-500">
                    {preset.description}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
