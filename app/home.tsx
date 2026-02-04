import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Button, ButtonText } from "@ui/button";
import { Box } from "@ui/box";
import { APP_CONFIG } from "@config/app.config";

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

          <Box className="rounded-lg p-4 mt-4">
            <Text
              className="text-lg font-semibold mb-2"
              style={{ fontFamily: "Card" }}
            >
              Quick Stretch
            </Text>
            <Text
              className="text-sm text-gray-600 mb-4"
              style={{ fontFamily: "SpaceMonoRegular" }}
            >
              Take a quick 5-minute break to stretch and feel better.
            </Text>
            <Button
              size="md"
              action="secondary"
              className="w-full"
              style={{ boxShadow: "4px 4px 0px #000" }}
              onPress={() => {
                // TODO: Quick stretch flow
              }}
            >
              <ButtonText>5 Min Stretch</ButtonText>
            </Button>
          </Box>
        </View>
      </ScrollView>
    </>
  );
}
