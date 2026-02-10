import React, { useState } from "react";
import { Alert, Platform } from "react-native";
import {
  getAvailablePurchases,
  finishTransaction,
  type Purchase,
} from "react-native-iap";
import { setHasPaid } from "@/src/utils/storage";
import { getAllSkus } from "@config/app.config";
import { Button, ButtonText } from "./ui/button";
import { Spinner } from "./ui/Spinner";

const allSkus = getAllSkus(Platform.OS as "ios" | "android");

export default function RestoreButton() {
  const [loading, setLoading] = useState(false);

  const handleRestore = async () => {
    setLoading(true);
    try {
      // Get all available purchases from the store
      // This includes both consumable and non-consumable purchases
      const restoredPurchases: Purchase[] = await getAvailablePurchases();

      // Find any valid purchase (lifetime or subscription) for this app
      const validPurchase = restoredPurchases.find((purchase) =>
        allSkus.includes(purchase.productId),
      );

      if (validPurchase) {
        // Complete the transaction to acknowledge receipt
        await finishTransaction({ purchase: validPurchase });
        // Update local storage to reflect premium status
        await setHasPaid(true);
        Alert.alert("Restored", "Your premium access has been restored.");
      } else {
        Alert.alert(
          "No Purchases Found",
          "We couldn't find any previous purchases.",
        );
      }
    } catch (err) {
      console.warn("Restore failed", err);
      Alert.alert(
        "Error",
        "Failed to restore purchases. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onPress={handleRestore}
      size="lg"
      action="secondary"
      className="flex-1 mt-2"
      disabled={loading}
    >
      {loading ? (
        <Spinner />
      ) : (
        <ButtonText className="text-black">Restore Purchase</ButtonText>
      )}
    </Button>
  );
}
