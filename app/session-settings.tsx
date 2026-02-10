import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import {
  getTransitionSoundEnabled,
  setTransitionSoundEnabled,
} from "@/src/utils/storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { BackButton } from "@/src/components/BackButton";
import { TimeSelector } from "@/src/components/TimeSelector";
import type {
  PosturePreference,
  CameraVisibility,
  FocusArea,
} from "@/src/types/pose";

export default function SessionSettings() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Initialize state from route params
  const [poseDuration, setPoseDuration] = useState<number>(
    Number(params.poseDuration) || 45,
  );
  const [isCustomPoseDuration, setIsCustomPoseDuration] = useState<boolean>(
    ![15, 30, 45, 60, 120, 300].includes(Number(params.poseDuration) || 45),
  );
  const [duration, setDuration] = useState<number>(
    Number(params.duration) || 5,
  );
  const [posture, setPosture] = useState<PosturePreference>(
    (params.posture as PosturePreference) || "sitting",
  );
  const [camera, setCamera] = useState<CameraVisibility | undefined>(
    params.camera as CameraVisibility | undefined,
  );
  const [focusArea, setFocusArea] = useState<FocusArea | undefined>(
    params.focus_area as FocusArea | undefined,
  );
  const [isCustomDuration, setIsCustomDuration] = useState<boolean>(
    ![2, 5, 10, 30, 45, 60, 90, 120].includes(Number(params.duration) || 5),
  );
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Load sound setting on mount
  useEffect(() => {
    setSoundEnabled(getTransitionSoundEnabled());
  }, []);

  // Handler for toggling sound
  function handleSoundToggle(value: boolean) {
    setSoundEnabled(value);
    setTransitionSoundEnabled(value);
  }

  const handleSave = () => {
    router.replace({
      pathname: "/session",
      params: {
        mode: params.mode || "just stretch",
        posture,
        camera,
        focus_area: focusArea,
        poseDuration,
        duration,
      },
    });
  };

  const focusAreas: FocusArea[] = ["wrists", "neck", "hips", "back"];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: "Session Settings",
          headerShown: false,
        }}
      />

      <BackButton onPress={handleSave} />

      <ScrollView className="flex-1 px-6 pt-16">
        <Text className="text-2xl font-bold mb-6 text-center">
          Session Settings
        </Text>

        {/* Time Per Pose */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Time Per Pose</Text>
          <TimeSelector
            presets={[
              { value: 15, label: "15s" },
              { value: 30, label: "30s" },
              { value: 45, label: "45s" },
              { value: 60, label: "1 min" },
              { value: 120, label: "2 min" },
              { value: 300, label: "5 min" },
            ]}
            value={poseDuration}
            onChange={setPoseDuration}
            isCustom={isCustomPoseDuration}
            onCustomToggle={setIsCustomPoseDuration}
            unit="seconds"
            min={5}
            max={600}
            step={5}
          />
        </View>

        {/* Duration */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Duration</Text>
          <TimeSelector
            presets={[
              { value: 2, label: "2 min" },
              { value: 5, label: "5 min" },
              { value: 10, label: "10 min" },
              { value: 30, label: "30 min" },
              { value: 45, label: "45 min" },
              { value: 60, label: "1 hour" },
              { value: 90, label: "1.5 hours" },
              { value: 120, label: "2 hours" },
            ]}
            value={duration}
            onChange={setDuration}
            isCustom={isCustomDuration}
            onCustomToggle={setIsCustomDuration}
            unit="minutes"
            min={1}
            max={120}
            step={1}
          />
        </View>

        {/* Posture */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Posture</Text>
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => setPosture("sitting")}
              className={`flex-1 py-3 rounded-lg border-2 ${
                posture === "sitting"
                  ? "bg-black border-black"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`font-semibold text-center ${
                  posture === "sitting" ? "text-white" : "text-gray-700"
                }`}
              >
                Sitting
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setPosture("standing")}
              className={`flex-1 py-3 rounded-lg border-2 ${
                posture === "standing"
                  ? "bg-black border-black"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`font-semibold text-center ${
                  posture === "standing" ? "text-white" : "text-gray-700"
                }`}
              >
                Standing
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setPosture("any")}
              className={`flex-1 py-3 rounded-lg border-2 ${
                posture === "any"
                  ? "bg-black border-black"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`font-semibold text-center ${
                  posture === "any" ? "text-white" : "text-gray-700"
                }`}
              >
                Any
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Camera */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Camera</Text>
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => setCamera("camera on")}
              className={`flex-1 py-3 rounded-lg border-2 ${
                camera === "camera on"
                  ? "bg-black border-black"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`font-semibold text-center ${
                  camera === "camera on" ? "text-white" : "text-gray-700"
                }`}
              >
                On
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setCamera("camera off")}
              className={`flex-1 py-3 rounded-lg border-2 ${
                camera === "camera off"
                  ? "bg-black border-black"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`font-semibold text-center ${
                  camera === "camera off" ? "text-white" : "text-gray-700"
                }`}
              >
                Off
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setCamera(undefined)}
              className={`flex-1 py-3 rounded-lg border-2 ${
                camera === undefined
                  ? "bg-black border-black"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`font-semibold text-center ${
                  camera === undefined ? "text-white" : "text-gray-700"
                }`}
              >
                Any
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Transition Sound */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Transition Sound</Text>
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => handleSoundToggle(true)}
              className={`flex-1 py-3 rounded-lg border-2 ${
                soundEnabled
                  ? "bg-black border-black"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`font-semibold text-center ${
                  soundEnabled ? "text-white" : "text-gray-700"
                }`}
              >
                On
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handleSoundToggle(false)}
              className={`flex-1 py-3 rounded-lg border-2 ${
                !soundEnabled
                  ? "bg-black border-black"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`font-semibold text-center ${
                  !soundEnabled ? "text-white" : "text-gray-700"
                }`}
              >
                Off
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Focus Area */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Focus Area</Text>
          <View className="flex-row flex-wrap gap-2">
            <Pressable
              onPress={() => setFocusArea(undefined)}
              className={`px-4 py-3 rounded-lg border-2 ${
                focusArea === undefined
                  ? "bg-black border-black"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`font-semibold ${
                  focusArea === undefined ? "text-white" : "text-gray-700"
                }`}
              >
                All
              </Text>
            </Pressable>
            {focusAreas.map((area) => (
              <Pressable
                key={area}
                onPress={() => setFocusArea(area)}
                className={`px-4 py-3 rounded-lg border-2 ${
                  focusArea === area
                    ? "bg-black border-black"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text
                  className={`font-semibold capitalize ${
                    focusArea === area ? "text-white" : "text-gray-700"
                  }`}
                >
                  {area}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
