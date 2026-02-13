import React from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Input, InputField } from "@ui/input";
import { Button, ButtonText } from "@ui/button";

type FollowupModalProps = {
  isOpen: boolean;
  isSubmitting: boolean;
  allowFollowup: boolean | null;
  followupEmail: string;
  onChangeAllowFollowup: (value: boolean) => void;
  onChangeFollowupEmail: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
  onSkip: () => void;
};

export function FollowupModal({
  isOpen,
  isSubmitting,
  allowFollowup,
  followupEmail,
  onChangeAllowFollowup,
  onChangeFollowupEmail,
  onClose,
  onSubmit,
  onSkip,
}: FollowupModalProps) {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 justify-center items-center bg-black/50"
        onPress={isSubmitting ? undefined : onClose}
      >
        <Pressable
          className="bg-white rounded-md w-[80%] max-w-[510px] p-6"
          onPress={() => {}}
        >
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-semibold">Can we follow up?</Text>
            <Pressable onPress={onClose} disabled={isSubmitting}>
              <Ionicons name="close" size={22} color="#111827" />
            </Pressable>
          </View>

          <View className="mt-2 mb-6">
            <Text className="text-sm text-[#5B5B5B]">
              If you're open to it, leave your email.
            </Text>

            <View className="flex-row gap-2 mt-4">
              <Pressable
                onPress={() => onChangeAllowFollowup(true)}
                accessibilityRole="button"
                className="flex-1"
                disabled={isSubmitting}
              >
                {({ pressed }) => {
                  const isSelected = allowFollowup === true;
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
                      className={`items-center justify-center rounded-full border-2 px-4 py-3 ${containerClassName}`}
                      style={
                        pressed ? { transform: [{ scale: 0.99 }] } : undefined
                      }
                    >
                      <Text className={`font-semibold ${textClassName}`}>
                        Yes
                      </Text>
                    </View>
                  );
                }}
              </Pressable>

              <Pressable
                onPress={onSkip}
                accessibilityRole="button"
                className="flex-1"
                disabled={isSubmitting}
              >
                {({ pressed }) => (
                  <View
                    className={`items-center justify-center rounded-full border-2 px-4 py-3 ${
                      pressed
                        ? "bg-gray-50 border-gray-400"
                        : "bg-white border-gray-200"
                    }`}
                    style={
                      pressed ? { transform: [{ scale: 0.99 }] } : undefined
                    }
                  >
                    <Text
                      className={`font-semibold ${
                        pressed ? "text-gray-800" : "text-gray-700"
                      }`}
                    >
                      No
                    </Text>
                  </View>
                )}
              </Pressable>
            </View>

            {allowFollowup ? (
              <View className="mt-3">
                <Input variant="outline" size="md" isDisabled={isSubmitting}>
                  <InputField
                    placeholder="Email"
                    value={followupEmail}
                    onChangeText={onChangeFollowupEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </Input>
              </View>
            ) : null}
          </View>

          {allowFollowup ? (
            <Button
              onPress={onSubmit}
              className="w-full"
              isDisabled={isSubmitting}
            >
              <ButtonText className="text-white">Submit</ButtonText>
            </Button>
          ) : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
