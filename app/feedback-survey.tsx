import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Alert,
  Animated,
  PanResponder,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { BackButton } from "@/src/components/BackButton";
import { Input, InputField } from "@ui/input";
import { Button, ButtonText } from "@ui/button";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/src/utils/supabase";
import { APP_CONFIG } from "@/src/config/app.config";

const PRIORITY_OTHER_KEY = "__other__";
const PRIORITY_ROW_HEIGHT = 64;

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

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function moveItem<T>(list: T[], fromIndex: number, toIndex: number): T[] {
  const copy = [...list];
  const [item] = copy.splice(fromIndex, 1);
  copy.splice(toIndex, 0, item);
  return copy;
}

type PriorityRowProps = {
  itemKey: string;
  label: string;
  index: number;
  draggingKey: string | null;
  dragY: Animated.Value;
  onDragStart: (key: string) => void;
  onDragMove: (dy: number) => void;
  onDragEnd: () => void;
};

function PriorityRow({
  itemKey,
  label,
  index,
  draggingKey,
  dragY,
  onDragStart,
  onDragMove,
  onDragEnd,
}: PriorityRowProps) {
  const isDragging = draggingKey === itemKey;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => onDragStart(itemKey),
      onPanResponderMove: (_evt, gestureState) => onDragMove(gestureState.dy),
      onPanResponderRelease: () => onDragEnd(),
      onPanResponderTerminate: () => onDragEnd(),
    }),
  ).current;

  return (
    <Animated.View
      style={[
        isDragging
          ? {
              transform: [{ translateY: dragY }],
              zIndex: 10,
            }
          : null,
      ]}
    >
      <View
        className={`h-16 flex-row items-center justify-between rounded-full border-2 px-4 ${
          isDragging
            ? "bg-[#FFF3E6] border-black"
            : "bg-white border-gray-200"
        }`}
        style={
          isDragging
            ? {
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
                elevation: 4,
              }
            : undefined
        }
      >
        <View className="flex-row items-center gap-3 flex-1">
          <View className="h-7 w-7 rounded-full bg-[#F1E2D2] items-center justify-center">
            <Text className="text-sm font-bold text-[#1B1B1B]">
              {index + 1}
            </Text>
          </View>
          <Text className="flex-1 font-semibold text-gray-700" numberOfLines={2}>
            {label}
          </Text>
        </View>

        <View {...panResponder.panHandlers} className="pl-3 py-2 -mr-2">
          <Ionicons
            name="reorder-three"
            size={24}
            color={isDragging ? "#111827" : "#6B7280"}
          />
        </View>
      </View>
    </Animated.View>
  );
}

export default function FeedbackSurvey() {
  const router = useRouter();
  const [feedbackText, setFeedbackText] = useState("");
  const [newFeatureRequest, setNewFeatureRequest] = useState<string[]>([]);
  const [newFeatureRequestOther, setNewFeatureRequestOther] = useState("");
  const [newFeatureRequestPriority, setNewFeatureRequestPriority] = useState<
    string[]
  >([]);
  const [draggingPriorityKey, setDraggingPriorityKey] = useState<string | null>(
    null,
  );
  const [isPriorityDragging, setIsPriorityDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dragY = useRef(new Animated.Value(0)).current;
  const priorityOrderRef = useRef<string[]>(newFeatureRequestPriority);
  const activePriorityKeyRef = useRef<string | null>(null);
  const initialPriorityIndexRef = useRef<number>(0);

  function toggleNewFeatureRequest(optionKey: string) {
    setNewFeatureRequest((prev) =>
      prev.includes(optionKey)
        ? prev.filter((key) => key !== optionKey)
        : [...prev, optionKey],
    );
  }

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    priorityOrderRef.current = newFeatureRequestPriority;
  }, [newFeatureRequestPriority]);

  const trimmedOther = newFeatureRequestOther.trim();
  const prioritySourceKeys = useMemo(() => {
    const keys = [...newFeatureRequest];
    if (trimmedOther) {
      keys.push(PRIORITY_OTHER_KEY);
    }
    return keys;
  }, [newFeatureRequest, trimmedOther]);

  useEffect(() => {
    setNewFeatureRequestPriority((prev) => {
      const next = prev.filter((key) => prioritySourceKeys.includes(key));
      const additions = prioritySourceKeys.filter((key) => !next.includes(key));
      return [...next, ...additions];
    });
  }, [prioritySourceKeys]);

  const startPriorityDrag = (key: string) => {
    if (activePriorityKeyRef.current) return;

    const initialIndex = priorityOrderRef.current.indexOf(key);
    if (initialIndex === -1) return;

    activePriorityKeyRef.current = key;
    initialPriorityIndexRef.current = initialIndex;
    dragY.setValue(0);
    setDraggingPriorityKey(key);
    setIsPriorityDragging(true);
  };

  const handlePriorityDragMove = (dy: number) => {
    const activeKey = activePriorityKeyRef.current;
    if (!activeKey) return;

    const order = priorityOrderRef.current;
    const initialIndex = initialPriorityIndexRef.current;
    const currentIndex = order.indexOf(activeKey);
    if (currentIndex === -1) return;

    const fingerY = initialIndex * PRIORITY_ROW_HEIGHT + dy;
    const targetIndex = clamp(
      Math.floor((fingerY + PRIORITY_ROW_HEIGHT / 2) / PRIORITY_ROW_HEIGHT),
      0,
      order.length - 1,
    );

    if (targetIndex !== currentIndex) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const nextOrder = moveItem(order, currentIndex, targetIndex);
      priorityOrderRef.current = nextOrder;
      setNewFeatureRequestPriority(nextOrder);
    }

    const translateY = dy + (initialIndex - targetIndex) * PRIORITY_ROW_HEIGHT;
    dragY.setValue(translateY);
  };

  const endPriorityDrag = () => {
    if (!activePriorityKeyRef.current) return;

    Animated.spring(dragY, {
      toValue: 0,
      useNativeDriver: true,
      friction: 8,
      tension: 80,
    }).start(() => {
      dragY.setValue(0);
    });

    activePriorityKeyRef.current = null;
    setDraggingPriorityKey(null);
    setIsPriorityDragging(false);
  };

  const priorityLabelByKey = useMemo(() => {
    const map = new Map<string, string>();
    for (const option of FEATURE_REQUEST_OPTIONS) {
      map.set(option.key, option.label);
    }
    if (trimmedOther) {
      map.set(PRIORITY_OTHER_KEY, `Other: ${trimmedOther}`);
    }
    return map;
  }, [trimmedOther]);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      if (!supabase) {
        Alert.alert(
          "Feedback not configured",
          "Missing Supabase environment variables.",
        );
        return;
      }

      const responses = {
        free_text: feedbackText.trim(),
        new_feature_request: newFeatureRequest,
        new_feature_request_other: trimmedOther,
        new_feature_request_priority: newFeatureRequestPriority,
      };

      const context = {
        platform: Platform.OS,
      };

      const { error } = await supabase.from("feedback_submissions").insert({
        app_slug: APP_CONFIG.slug,
        survey_name: "feedback-survey",
        survey_version: 1,
        responses,
        context,
      });

      if (error) {
        throw error;
      }

      router.back();
    } catch (err) {
      console.warn("Feedback submit error", err);
      Alert.alert("Couldn’t submit feedback", "Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        scrollEnabled={!isPriorityDragging}
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
                accessibilityRole="button"
              >
                {({ pressed }) => {
                  const containerClassName = isSelected
                    ? pressed
                      ? "bg-gray-900 border-gray-900"
                      : "bg-black border-black"
                    : pressed
                      ? "bg-gray-50 border-gray-400"
                      : "bg-white border-gray-200";

                  const textClassName = isSelected
                    ? "text-white"
                    : pressed
                      ? "text-gray-800"
                      : "text-gray-700";

                  return (
                    <View
                      className={`flex-row items-center justify-between rounded-full border-2 px-4 py-3 ${containerClassName}`}
                      style={pressed ? { transform: [{ scale: 0.99 }] } : undefined}
                    >
                      <Text className={`flex-1 font-semibold ${textClassName}`}>
                        {option.label}
                      </Text>
                      {isSelected ? (
                        <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                      ) : null}
                    </View>
                  );
                }}
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

        {newFeatureRequestPriority.length > 0 ? (
          <>
            <Text className="text-lg font-semibold text-[#1B1B1B] mt-8 mb-2">
              What should we prioritize?
            </Text>
            <Text className="text-sm text-[#5B5B5B] mb-3">
              Drag and drop to rank what you’d like to see first.
            </Text>

            <View className="gap-2">
              {newFeatureRequestPriority.map((key, index) => (
                <PriorityRow
                  key={key}
                  itemKey={key}
                  label={priorityLabelByKey.get(key) ?? key}
                  index={index}
                  draggingKey={draggingPriorityKey}
                  dragY={dragY}
                  onDragStart={startPriorityDrag}
                  onDragMove={handlePriorityDragMove}
                  onDragEnd={endPriorityDrag}
                />
              ))}
            </View>
          </>
        ) : null}

        <View className="mt-6">
          <Button onPress={handleSubmit} className="w-full" disabled={isSubmitting}>
            <ButtonText className="text-white">Submit</ButtonText>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
