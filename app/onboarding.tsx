import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { setUserName } from "@/src/utils/storage";

// ui
import { Box } from "@/src/components/ui/box";
import { View, Text, KeyboardAvoidingView } from "react-native";
import { Input, InputField } from "@/src/components/ui/input";
import { Button, ButtonText } from "@ui/button";

export default function Onboarding() {
  const router = useRouter();
  const [name, setName] = useState("");

  function handleSave() {
    setUserName(name.trim());
    router.replace("/home");
  }

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerShown: false }} />
      <Box className=" rounded-lg p-4 mb-2">
        <Text className="text-lg font-semibold mb-2 ">Name</Text>
        <Input size="lg">
          <InputField placeholder="Name" value={name} onChangeText={setName} />
        </Input>
      </Box>
      <View className="flex-row mt-2 mb-28">
        <Button size="lg" onPress={handleSave} className="flex-1">
          <ButtonText className="text-white">Save</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}
