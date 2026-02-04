import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Button, ButtonText } from "@ui/button";
import { Box } from "@ui/box";
import { APP_CONFIG } from "@config/app.config";
import { PRESETS } from "@/src/types/presets";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: APP_CONFIG.displayName,
          headerTitleStyle: {
            fontFamily: "Card",
          },
          headerRight: () => (
            <Button
              size="sm"
              action="secondary"
              variant="link"
              onPress={() => router.push("/settings")}
            >
              <ButtonText>Settings</ButtonText>
            </Button>
          ),
        }}
      />
      <ScrollView className="flex-1">
        <View className="flex-1 p-4">
          <Box className="rounded-lg p-6 mb-4 items-center">
            <Text
              className="text-2xl font-bold mb-2 text-center"
              style={{ fontFamily: "Card" }}
            >
              {APP_CONFIG.displayName}
            </Text>
            <Text
              className="text-base text-gray-600 text-center"
              style={{ fontFamily: "SpaceMonoRegular" }}
            >
              {APP_CONFIG.tagline}
            </Text>
          </Box>

          <Button
            size="lg"
            action="primary"
            className="w-full mb-4"
            style={{ boxShadow: "4px 4px 0px #000" }}
            onPress={() => {
              // TODO: Start session flow
            }}
          >
            <ButtonText className="text-white">Start Session</ButtonText>
          </Button>

          <Text
            className="text-lg font-semibold mt-4 mb-2"
            style={{ fontFamily: "Card" }}
          >
            Quick Relief
          </Text>

          {PRESETS.map((preset) => (
            <Pressable
              key={preset.id}
              onPress={() => {
                // TODO: Start session with preset.config
              }}
            >
              <Box
                className="rounded-lg p-4 mb-3 flex-row items-center"
                style={{ borderWidth: 2, borderColor: "#000" }}
              >
                <Text className="text-3xl mr-4">{preset.icon}</Text>
                <View className="flex-1">
                  <Text
                    className="text-base font-semibold"
                    style={{ fontFamily: "Card" }}
                  >
                    {preset.name}
                  </Text>
                  <Text
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "SpaceMonoRegular" }}
                  >
                    {preset.description}
                  </Text>
                </View>
              </Box>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
