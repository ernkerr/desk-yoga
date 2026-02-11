import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ImageBackground,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { Button, ButtonText } from "@ui/button";
import { Ionicons } from "@expo/vector-icons";
import { PRESETS } from "@/src/types/presets";
import { APP_CONFIG } from "@/src/config/app.config";
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

  const getPresetAspectRatio = (preset: (typeof PRESETS)[number]) => {
    if (!preset.image) return 16 / 9;
    const { width, height } = Image.resolveAssetSource(preset.image);
    if (!width || !height) return 16 / 9;
    return width / height;
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F2E3D3]"
      edges={["top", "left", "right"]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View
        pointerEvents="none"
        className="absolute -top-16 left-0 h-56 w-[120%] bg-[#E7D3C0] opacity-40"
        style={{ transform: [{ rotate: "-4deg" }] }}
      />
      <View
        pointerEvents="none"
        className="absolute top-44 -right-16 h-64 w-[130%] bg-[#EAD8C6] opacity-30"
        style={{ transform: [{ rotate: "3deg" }] }}
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
      >
        <View className="flex-1 px-5 pt-4">
          <View className="mb-6">
            <Text
              className="text-xs uppercase text-[#6A6A6A]"
              style={{ letterSpacing: 2 }}
            >
              Desk Yoga
            </Text>
            <Text className="text-3xl font-semibold text-[#1B1B1B] mt-2">
              {getGreeting()}, {getUserName()}
            </Text>
            <Text className="text-base text-[#5B5B5B] mt-2">
              {APP_CONFIG.tagline}
            </Text>
          </View>

          <Pressable
            onPress={() => router.push("/session-setup")}
            className="mb-6"
          >
            <View className="relative">
              <View className="absolute left-1.5 top-1.5 h-full w-full rounded-3xl bg-[#E9B07B]" />
              <View className="rounded-3xl bg-[#F2C28B] px-6 py-5">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-xs uppercase text-[#1B1B1B]">
                      Start Session
                    </Text>
                    <Text className="text-2xl font-semibold text-[#1B1B1B] mt-1">
                      Build your flow
                    </Text>
                  </View>
                  <View className="h-11 w-11 items-center justify-center rounded-full bg-[#8C3F19]">
                    <Ionicons name="arrow-forward" size={18} color="#FFF1E4" />
                  </View>
                </View>
              </View>
            </View>
          </Pressable>

          <Text className="text-sm font-semibold text-[#2B2B2B] mb-3">
            Presets
          </Text>

          {PRESETS.map((preset) => {
            const aspectRatio = getPresetAspectRatio(preset);
            return (
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
                <View className="mb-4 rounded-2xl border border-[#E4D2BF] bg-[#FFF3E6] overflow-hidden shadow-sm">
                  {preset.image ? (
                    <ImageBackground
                      source={preset.image}
                      className="w-full"
                      style={{ aspectRatio }}
                      imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                    />
                  ) : (
                    <View
                      className="w-full bg-[#F3E4D4]"
                      style={{ aspectRatio }}
                    />
                  )}
                  <View className="px-4 py-3">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-base font-semibold text-[#1B1B1B]">
                        {preset.name}
                      </Text>
                      {!isPaid && (
                        <View className="flex-row items-center rounded-full bg-[#F1E2D2] px-2 py-1">
                          <Ionicons
                            name="lock-closed"
                            size={12}
                            color="#7A4A2B"
                          />
                          <Text className="text-xs text-[#7A4A2B] ml-1">
                            Locked
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-sm text-[#5B5B5B] mt-1">
                      {preset.description}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
