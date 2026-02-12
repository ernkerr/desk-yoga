import React, { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { BackButton } from "@/src/components/BackButton";
import { Input, InputField } from "@ui/input";
import { Button, ButtonText } from "@ui/button";

export default function FeedbackSurvey() {
  const router = useRouter();
  const [feedbackText, setFeedbackText] = useState("");

  return (
    <SafeAreaView
      className="flex-1 bg-[#F2E3D3]"
      edges={["top", "left", "right"]}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <BackButton />

      <View className="flex-1 px-6 pt-16">
        <Text className="text-2xl font-bold text-center">Feedback</Text>
        <Text className="text-base text-[#5B5B5B] mt-2 text-center">
          What should we improve?
        </Text>

        <View className="mt-6">
          <Input variant="outline" size="md" className="h-40 items-start">
            <InputField
              placeholder="Type your feedback..."
              value={feedbackText}
              onChangeText={setFeedbackText}
              multiline
              textAlignVertical="top"
              className="py-3"
            />
          </Input>
        </View>

        <View className="mt-4">
          <Button onPress={() => router.back()} className="w-full">
            <ButtonText className="text-white">Submit</ButtonText>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
