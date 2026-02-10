import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "@ui/button";
import { Input, InputField } from "@ui/input";
import BuyButton from "@/src/components/BuyButton";
import RestoreButton from "@/src/components/RestoreButton";
import { setHasPaid } from "@/src/utils/storage";
import {
  isValidPromoCode,
  getLifetimeSku,
  getSubscriptionSku,
  type SubscriptionPeriod,
} from "@config/app.config";
import {
  initConnection,
  endConnection,
  fetchProducts,
  purchaseUpdatedListener,
  purchaseErrorListener,
  finishTransaction,
  type Purchase,
} from "react-native-iap";

type PurchaseOption = "weekly" | "monthly" | "yearly" | "lifetime";

type ProductInfo = {
  sku: string;
  displayPrice: string;
};

const platform = Platform.OS as "ios" | "android";

const OPTIONS: {
  key: PurchaseOption;
  label: string;
  sublabel: string;
  fallbackPrice: string;
}[] = [
  { key: "weekly", label: "Weekly", sublabel: "per week", fallbackPrice: "$4.99" },
  { key: "monthly", label: "Monthly", sublabel: "per month", fallbackPrice: "$9.99" },
  { key: "yearly", label: "Yearly", sublabel: "per year", fallbackPrice: "$39.99" },
  { key: "lifetime", label: "Lifetime", sublabel: "one-time", fallbackPrice: "$79.99" },
];

const FEATURES = [
  "All presets unlocked",
  "80+ yoga poses",
  "Custom session flows",
];

export default function PaywallScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<PurchaseOption>("yearly");
  const [products, setProducts] = useState<Record<string, ProductInfo>>({});
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState("");
  const [codeLoading, setCodeLoading] = useState(false);
  const [codeError, setCodeError] = useState("");

  // Fetch all products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        await initConnection();

        // Fetch lifetime product
        const lifetimeSku = getLifetimeSku(platform);
        const lifetimeResults = await fetchProducts({ skus: [lifetimeSku] });
        if (lifetimeResults && lifetimeResults.length > 0) {
          setProducts((prev) => ({
            ...prev,
            lifetime: {
              sku: lifetimeSku,
              displayPrice: lifetimeResults[0].displayPrice,
            },
          }));
        }

        // Fetch subscription products
        const subSkus = (
          ["weekly", "monthly", "yearly"] as SubscriptionPeriod[]
        ).map((p) => getSubscriptionSku(platform, p));
        const subResults = await fetchProducts({
          skus: subSkus,
          type: "subs",
        });
        if (subResults) {
          const subMap: Record<string, ProductInfo> = {};
          for (const period of [
            "weekly",
            "monthly",
            "yearly",
          ] as SubscriptionPeriod[]) {
            const sku = getSubscriptionSku(platform, period);
            const sub = subResults.find(
              (s) => (s as any).productId === sku,
            );
            if (sub) {
              subMap[period] = {
                sku,
                displayPrice: sub.displayPrice,
              };
            }
          }
          setProducts((prev) => ({ ...prev, ...subMap }));
        }
      } catch (err) {
        console.warn("Error loading IAP products", err);
      }
    };

    loadProducts();

    return () => {
      endConnection();
    };
  }, []);

  // Purchase listeners
  useEffect(() => {
    const purchaseUpdateSub = purchaseUpdatedListener(
      async (purchase: Purchase) => {
        try {
          if (purchase.transactionId) {
            await finishTransaction({ purchase });
            setHasPaid(true);
            router.back();
          }
        } catch (ackErr) {
          console.warn("Failed to finish transaction", ackErr);
        }
      },
    );

    const purchaseErrorSub = purchaseErrorListener((error) => {
      console.warn("Purchase error", error);
      Alert.alert("Purchase failed", error.message);
    });

    return () => {
      purchaseUpdateSub?.remove();
      purchaseErrorSub?.remove();
    };
  }, [router]);

  function handleCodeSubmit() {
    setCodeLoading(true);
    setCodeError("");
    Promise.resolve(isValidPromoCode(code.trim()))
      .then((isValid) => {
        if (isValid) {
          setHasPaid(true);
          Alert.alert("Success", "Code accepted! You now have full access.");
          router.back();
        } else {
          setCodeError("Invalid code. Please try again.");
        }
      })
      .catch(() => {
        setCodeError("Something went wrong. Please try again.");
      })
      .finally(() => {
        setCodeLoading(false);
      });
  }

  const selectedProduct = products[selected];
  const selectedSku = selectedProduct?.sku || "";
  const selectedType = selected === "lifetime" ? "in-app" : "subs";
  const selectedOption = OPTIONS.find((o) => o.key === selected)!;
  const selectedPrice = selectedProduct?.displayPrice || selectedOption.fallbackPrice;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
      >
        {/* Hero */}
        <ImageBackground
          source={require("@/assets/images/presets/coloredriso1.png")}
          className="h-56 justify-end"
        >
          <View className="absolute inset-0 bg-black/40" />

          {/* Back button */}
          <Pressable
            onPress={() => router.back()}
            className="absolute top-4 left-4 z-10 w-10 h-10 items-center justify-center"
          >
            <Ionicons name="close" size={28} color="white" />
          </Pressable>

          <View className="p-6 z-10">
            <Text
              className="text-3xl font-bold text-white"
              style={{ fontFamily: "SpaceMono" }}
            >
              Unlock Full Access
            </Text>
            <Text
              className="text-base text-white/80 mt-1"
              style={{ fontFamily: "SpaceMonoRegular" }}
            >
              Feel better while you work
            </Text>
          </View>
        </ImageBackground>

        <View className="px-6 pt-6 pb-4">
          {/* Features */}
          <View className="mb-6">
            {FEATURES.map((feature) => (
              <View key={feature} className="flex-row items-center mb-3">
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color="#000"
                />
                <Text
                  className="text-base ml-3 text-gray-800"
                  style={{ fontFamily: "SpaceMonoRegular" }}
                >
                  {feature}
                </Text>
              </View>
            ))}
          </View>

          {/* Plan options */}
          <View className="gap-3 mb-6">
            {OPTIONS.map((option) => {
              const product = products[option.key];
              const isSelected = selected === option.key;
              return (
                <Pressable
                  key={option.key}
                  onPress={() => setSelected(option.key)}
                  className={`p-4 rounded-xl border-2 ${
                    isSelected
                      ? "border-black bg-gray-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text
                        className={`text-base font-bold ${
                          isSelected ? "text-black" : "text-gray-600"
                        }`}
                        style={{ fontFamily: "SpaceMono" }}
                      >
                        {option.label}
                      </Text>
                      <Text
                        className={`text-xs mt-0.5 ${
                          isSelected ? "text-gray-600" : "text-gray-400"
                        }`}
                        style={{ fontFamily: "SpaceMonoRegular" }}
                      >
                        {option.sublabel}
                      </Text>
                    </View>
                    <Text
                      className={`text-lg font-bold ${
                        isSelected ? "text-black" : "text-gray-500"
                      }`}
                      style={{ fontFamily: "SpaceMono" }}
                    >
                      {product?.displayPrice || option.fallbackPrice}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* CTA Button */}
          {selectedSku ? (
            <BuyButton
              sku={selectedSku}
              type={selectedType as "in-app" | "subs"}
              label={`Continue \u2013 ${selectedPrice}`}
            />
          ) : (
            <BuyButton
              sku=""
              type="in-app"
              label={`Continue \u2013 ${selectedOption.fallbackPrice}`}
            />
          )}

          {/* Restore */}
          <View className="mt-4">
            <RestoreButton />
          </View>

          {/* Promo code (Android only) */}
          {Platform.OS === "android" && (
            <View className="mt-4 items-center">
              {showCodeInput ? (
                <View className="w-full">
                  <Input variant="outline" size="md" isDisabled={codeLoading}>
                    <InputField
                      placeholder="Enter code"
                      value={code}
                      onChangeText={setCode}
                      autoCapitalize="characters"
                      style={{ fontFamily: "SpaceMonoRegular" }}
                    />
                  </Input>
                  {codeError ? (
                    <Text
                      className="text-red-500 mt-2"
                      style={{ fontFamily: "SpaceMonoRegular" }}
                    >
                      {codeError}
                    </Text>
                  ) : null}
                  <Button
                    onPress={handleCodeSubmit}
                    className="mt-3"
                  >
                    <ButtonText className="text-white text-center">
                      Redeem Code
                    </ButtonText>
                  </Button>
                </View>
              ) : (
                <Text
                  className="text-[#26ABFF] text-center underline"
                  style={{ fontFamily: "SpaceMonoRegular" }}
                  onPress={() => setShowCodeInput(true)}
                >
                  Have a code?
                </Text>
              )}
            </View>
          )}

          <View className="h-8" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
