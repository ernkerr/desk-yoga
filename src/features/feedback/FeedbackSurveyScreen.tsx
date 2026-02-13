import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, Alert, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Constants from "expo-constants";

import { BackButton } from "@/src/components/BackButton";
import { Input, InputField } from "@ui/input";
import { Button, ButtonText } from "@ui/button";

import { supabase } from "@/src/utils/supabase";
import { APP_CONFIG } from "@/src/config/app.config";
import { getHasPaid } from "@/src/utils/storage";

import {
  FEATURE_REQUEST_OPTIONS,
  FEATURE_REQUEST_OTHER_KEY,
  type Enjoyment,
} from "./feedbackSurveyOptions";
import { EnjoymentButtons } from "./components/EnjoymentButtons";
import { FeatureRequestMultiSelect } from "./components/FeatureRequestMultiSelect";
import { RankedPillList } from "./components/RankedPillList";
import { FollowupModal } from "./components/FollowupModal";

function getErrorMessage(err: unknown): string {
  if (!err) return "Unknown error.";
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message || "Unknown error.";
  if (typeof err === "object") {
    const anyErr = err as any;
    const message =
      anyErr.message ?? anyErr.error_description ?? anyErr.error ?? null;
    const code = anyErr.code ?? null;
    const details = anyErr.details ?? null;
    const hint = anyErr.hint ?? null;
    return [code ? `(${code})` : null, message, details, hint]
      .filter(Boolean)
      .join("\n");
  }
  return "Unknown error.";
}

export default function FeedbackSurveyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const source = typeof params.source === "string" ? params.source : null;

  const [enjoyment, setEnjoyment] = useState<Enjoyment | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [otherFeatureText, setOtherFeatureText] = useState("");
  const [excitementOrder, setExcitementOrder] = useState<string[]>([]);

  const [betterText, setBetterText] = useState("");

  const [isRankingDragging, setIsRankingDragging] = useState(false);
  const [isFollowupModalOpen, setIsFollowupModalOpen] = useState(false);
  const [allowFollowup, setAllowFollowup] = useState<boolean | null>(null);
  const [followupEmail, setFollowupEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const trimmedOther = otherFeatureText.trim();
  const featureKeys = useMemo(() => {
    const keys = [...selectedFeatures];
    if (trimmedOther) keys.push(FEATURE_REQUEST_OTHER_KEY);
    return keys;
  }, [selectedFeatures, trimmedOther]);

  useEffect(() => {
    setExcitementOrder((prev) => {
      const next = prev.filter((key) => featureKeys.includes(key));
      const additions = featureKeys.filter((key) => !next.includes(key));
      return [...next, ...additions];
    });
  }, [featureKeys]);

  const labelsByKey = useMemo(() => {
    const map = new Map<string, string>();
    for (const option of FEATURE_REQUEST_OPTIONS) {
      map.set(option.key, option.label);
    }
    if (trimmedOther) {
      map.set(FEATURE_REQUEST_OTHER_KEY, `Other: ${trimmedOther}`);
    }
    return map;
  }, [trimmedOther]);

  function toggleFeature(optionKey: string) {
    setSelectedFeatures((prev) =>
      prev.includes(optionKey)
        ? prev.filter((key) => key !== optionKey)
        : [...prev, optionKey],
    );
  }

  const submitFeedback = async ({
    allowFollowup: allowFollowupOverride,
    followupEmail: followupEmailOverride,
  }: {
    allowFollowup: boolean;
    followupEmail: string;
  }) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      if (!supabase) {
        Alert.alert(
          "Feedback not configured",
          "Missing Supabase environment variables. Make sure EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY are set, then restart Expo.",
        );
        return;
      }

      const isPaid = getHasPaid();
      const appVersion = Constants.expoConfig?.version ?? null;
      const iosBuildNumber = Constants.expoConfig?.ios?.buildNumber ?? null;
      const androidVersionCode =
        Constants.expoConfig?.android?.versionCode ?? null;

      const responses = {
        enjoyment,
        feature_requests: featureKeys,
        feature_request_other: trimmedOther || null,
        feature_excitement_order: excitementOrder,
        better_text: betterText.trim(),
        followup_permission: allowFollowupOverride,
        followup_email: allowFollowupOverride ? followupEmailOverride : null,
      };

      const context = {
        platform: Platform.OS,
        source,
        is_paid: isPaid,
        app_version: appVersion,
        ios_build_number: iosBuildNumber,
        android_version_code: androidVersionCode,
      };

      const { error } = await supabase.from("feedback_submissions").insert({
        app_slug: APP_CONFIG.slug,
        survey_name: "feedback-survey",
        survey_version: 1,
        responses,
        context,
      });

      if (error) throw error;

      router.back();
    } catch (err) {
      console.warn("Feedback submit error", err);
      Alert.alert("Couldn’t submit feedback", getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkipFollowup = () => {
    submitFeedback({ allowFollowup: false, followupEmail: "" });
  };

  const handleFinalSubmit = () => {
    const finalAllowFollowup = allowFollowup ?? false;
    const trimmedEmail = followupEmail.trim();

    if (finalAllowFollowup) {
      if (!trimmedEmail) {
        Alert.alert("Email required", "Please enter your email address.");
        return;
      }
      if (!trimmedEmail.includes("@")) {
        Alert.alert("Invalid email", "Please enter a valid email address.");
        return;
      }
    }

    submitFeedback({ allowFollowup: finalAllowFollowup, followupEmail: trimmedEmail });
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F2E3D3]"
      edges={["top", "left", "right"]}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <BackButton
        onPress={() => {
          if (isFollowupModalOpen) {
            setIsFollowupModalOpen(false);
            return;
          }
          router.back();
        }}
      />

      <ScrollView
        className="flex-1 px-6 pt-16"
        contentContainerStyle={{ paddingBottom: 24 }}
        scrollEnabled={!isRankingDragging}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-2xl font-bold text-center">Feedback</Text>

        <Text className="text-lg font-semibold text-[#1B1B1B] mt-8 mb-2">
          Are you enjoying the app?
        </Text>
        <EnjoymentButtons value={enjoyment} onChange={setEnjoyment} />

        <Text className="text-lg font-semibold text-[#1B1B1B] mt-8 mb-2">
          Which would you like to see?
        </Text>
        <Text className="text-sm text-[#5B5B5B] mb-3">
          Select all that apply.
        </Text>
        <FeatureRequestMultiSelect
          selectedKeys={selectedFeatures}
          onToggle={toggleFeature}
          otherText={otherFeatureText}
          onOtherTextChange={setOtherFeatureText}
        />

        {excitementOrder.length > 0 ? (
          <>
            <Text className="text-lg font-semibold text-[#1B1B1B] mt-8 mb-2">
              Which are you the most excited for?
            </Text>
            <Text className="text-sm text-[#5B5B5B] mb-3">
              Drag and drop to rank what you’re most excited to see.
            </Text>
            <RankedPillList
              order={excitementOrder}
              labelsByKey={labelsByKey}
              onOrderChange={setExcitementOrder}
              onDraggingChange={setIsRankingDragging}
            />
          </>
        ) : null}

        <Text className="text-lg font-semibold text-[#1B1B1B] mt-8 mb-2">
          What would make the app better?
        </Text>
        <Text className="text-sm text-[#5B5B5B] mb-3">
          What’s working? What’s not working?
        </Text>
        <Input variant="outline" size="md" className="h-40 items-start">
          <InputField
            placeholder="What’s working? What’s not working?"
            value={betterText}
            onChangeText={setBetterText}
            multiline
            textAlignVertical="top"
            className="py-3"
          />
        </Input>

        <View className="mt-6">
          <Button
            onPress={() => {
              setAllowFollowup(null);
              setFollowupEmail("");
              setIsFollowupModalOpen(true);
            }}
            className="w-full"
            isDisabled={isSubmitting}
          >
            <ButtonText className="text-white">Submit</ButtonText>
          </Button>
        </View>
      </ScrollView>

      <FollowupModal
        isOpen={isFollowupModalOpen}
        isSubmitting={isSubmitting}
        allowFollowup={allowFollowup}
        followupEmail={followupEmail}
        onChangeAllowFollowup={(value) => {
          setAllowFollowup(value);
          if (!value) setFollowupEmail("");
        }}
        onChangeFollowupEmail={setFollowupEmail}
        onClose={() => setIsFollowupModalOpen(false)}
        onSubmit={handleFinalSubmit}
        onSkip={handleSkipFollowup}
      />
    </SafeAreaView>
  );
}
