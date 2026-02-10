import React, { useState } from "react";
import { Alert, Platform } from "react-native";
import { requestPurchase } from "react-native-iap";
import { Button, ButtonText } from "./ui/button";
import { Spinner } from "./ui/Spinner";

type BuyButtonProps = {
  sku: string;
  type: "in-app" | "subs";
  label?: string;
  onSuccess?: () => void;
};

export default function BuyButton({ sku, type, label, onSuccess }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      await requestPurchase({
        type,
        request: Platform.select({
          ios: { ios: { sku } },
          android: { android: { skus: [sku] } },
        })!,
      });
      // Purchase listener in paywall page handles success
    } catch (err) {
      console.warn("Request purchase error", err);
      Alert.alert("Purchase failed", "Please try again.");
      setLoading(false);
    }
  };

  return (
    <Button
      onPress={handleBuy}
      size="md"
      action="primary"
      className="w-full"
      disabled={loading}
    >
      {loading ? (
        <Spinner />
      ) : (
        <ButtonText className="text-white">{label || "Buy"}</ButtonText>
      )}
    </Button>
  );
}
