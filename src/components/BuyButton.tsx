import React, { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import {
  fetchProducts,
  requestPurchase,
  purchaseUpdatedListener,
  purchaseErrorListener,
  finishTransaction,
  type Purchase,
} from "react-native-iap";
import { setHasPaid } from "@core/storage";
import { IAP_CONFIG } from "@config/app.config";
import { Button, ButtonText } from "./ui/button";
import { Spinner } from "./ui/Spinner";

// Simple product info we need for display
type ProductInfo = {
  displayName?: string | null;
  title?: string;
  displayPrice: string;
};

const sku = Platform.select({
  ios: IAP_CONFIG.products.ios,
  android: IAP_CONFIG.products.android,
});

export default function BuyButton({ onSuccess }: { onSuccess?: () => void }) {
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let purchaseUpdateSub: any;
    let purchaseErrorSub: any;

    const init = async () => {
      try {
        // v14: use fetchProducts instead of getProducts
        const products = await fetchProducts({ skus: [sku!] });
        if (products && products.length > 0) {
          const p = products[0];
          setProduct({
            displayName: p.displayName,
            title: p.title,
            displayPrice: p.displayPrice,
          });
        }
      } catch (err) {
        console.warn("Error loading IAP products", err);
      }

      // Listen to purchase updates
      purchaseUpdateSub = purchaseUpdatedListener(
        async (purchase: Purchase) => {
          try {
            if (purchase.transactionId) {
              // Acknowledge / Finish transaction (very important!)
              await finishTransaction({ purchase });
              setHasPaid(true);
              setLoading(false);
              onSuccess?.();
            }
          } catch (ackErr) {
            setLoading(false);
            console.warn("Failed to finish transaction", ackErr);
          }
        }
      );

      // Listen to purchase errors
      purchaseErrorSub = purchaseErrorListener((error) => {
        setLoading(false);
        console.warn("Purchase error", error);
        Alert.alert("Purchase failed", error.message);
      });
    };

    init();

    return () => {
      purchaseUpdateSub?.remove();
      purchaseErrorSub?.remove();
    };
  }, [onSuccess]);

  const handleBuy = async () => {
    setLoading(true);
    try {
      // v14: requestPurchase takes { type, request: { ios/android } }
      await requestPurchase({
        type: "in-app",
        request: Platform.select({
          ios: { ios: { sku: sku! } },
          android: { android: { skus: [sku!] } },
        })!,
      });
    } catch (err) {
      console.warn("Request purchase error", err);
      Alert.alert("Purchase failed", "Please try again.");
      setLoading(false);
    }
  };

  // Format price display - v14 uses displayPrice and displayName
  const getPriceDisplay = () => {
    if (!product) return "Loading...";
    const name = product.displayName || product.title || "Premium";
    const price = product.displayPrice || "";
    return `Buy ${name} - ${price}`;
  };

  return (
    <Button
      onPress={handleBuy}
      size="md"
      action="primary"
      className="w-full"
      style={{ boxShadow: "4px 4px 0px #000" }}
      disabled={loading}
    >
      {loading ? (
        <Spinner />
      ) : (
        <ButtonText className="text-white">{getPriceDisplay()}</ButtonText>
      )}
    </Button>
  );
}
