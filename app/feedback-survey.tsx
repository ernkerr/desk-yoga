import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { BackButton } from "@/src/components/BackButton";
import { Input, InputField } from "@ui/input";
import { Button, ButtonText } from "@ui/button";
import { Ionicons } from "@expo/vector-icons";

const FEATURE_REQUEST_OPTIONS = [
  {
    key: "pose_modifications",
    label: "Want to see modifications for poses?",
  },
  {
    key: "pose_technical_names",
    label: "Want to know the real technical names of the poses?",
  },
  {
    key: "alignment_tips",
    label: "More alignment tips",
  },
  {
    key: "common_mistakes",
    label: "Common mistakes to avoid (ex: tree pose — foot on knee joint)",
  },
  {
    key: "pomodoro_timer",
    label: "Integrated pomodoro timer",
  },
  {
    key: "typing_friendly_poses",
    label: "Typing-friendly poses (so you can do poses while typing)",
  },
] as const;

export default function FeedbackSurvey() {
  const router = useRouter();
  const [feedbackText, setFeedbackText] = useState("");
  const [newFeatureRequest, setNewFeatureRequest] = useState<string[]>([]);
  const [newFeatureRequestOther, setNewFeatureRequestOther] = useState("");

  function toggleNewFeatureRequest(optionKey: string) {
    setNewFeatureRequest((prev) =>
      prev.includes(optionKey)
        ? prev.filter((key) => key !== optionKey)
        : [...prev, optionKey],
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-[#F2E3D3]"
      edges={["top", "left", "right"]}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <BackButton />

      <ScrollView
        className="flex-1 px-6 pt-16"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
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

        <Text className="text-lg font-semibold text-[#1B1B1B] mt-8 mb-2">
          Feature request
        </Text>
        <Text className="text-sm text-[#5B5B5B] mb-3">
          Click the features you’d like to see.
        </Text>

        <View className="gap-2">
          {FEATURE_REQUEST_OPTIONS.map((option) => {
            const isSelected = newFeatureRequest.includes(option.key);
            return (
              <Pressable
                key={option.key}
                onPress={() => toggleNewFeatureRequest(option.key)}
                className={`flex-row items-center justify-between rounded-lg border-2 px-4 py-3 ${
                  isSelected
                    ? "bg-black border-black"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text
                  className={`flex-1 font-semibold ${
                    isSelected ? "text-white" : "text-gray-700"
                  }`}
                >
                  {option.label}
                </Text>
                {isSelected ? (
                  <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                ) : null}
              </Pressable>
            );
          })}
        </View>

        <Text className="text-lg font-semibold text-[#1B1B1B] mt-6 mb-2">
          Other
        </Text>
        <Input variant="outline" size="md">
          <InputField
            placeholder="Any other feature you’d like?"
            value={newFeatureRequestOther}
            onChangeText={setNewFeatureRequestOther}
          />
        </Input>

        <View className="mt-6">
          <Button onPress={() => router.back()} className="w-full">
            <ButtonText className="text-white">Submit</ButtonText>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
