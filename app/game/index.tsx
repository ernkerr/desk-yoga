import React, { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { useFocusEffect, useRouter, Stack } from "expo-router";
import { Box } from "@ui/box";
import { Text } from "@ui/text";
import { Button, ButtonText } from "@ui/button";
import { getGames, getHasPaid, deleteGame } from "@core/storage";
import { FEATURES } from "@config/app.config";
import { SettingsIcon } from "lucide-react-native";
import PaywallModal from "@components/PaywallModal";
import { GameCard } from "@components/GameCard";
import type { HeartsGame } from "@games/hearts";

// Main screen that lists all games
export default function GamesScreen() {
  const router = useRouter();
  const [games, setGames] = useState<HeartsGame[]>([]);
  const [hasPaid, setHasPaidState] = useState(false);
  const [showPaywallModal, setShowPaywallModal] = useState(false);

  // Load games when the screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      const allGames = getGames<HeartsGame>();
      // Sort by most recent
      const sorted = [...allGames].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setGames(sorted);
      setHasPaidState(getHasPaid());
    }, [])
  );

  function handleStartNewGame() {
    // Paywall: free users can only have limited games
    if (!hasPaid && games.length >= FEATURES.maxFreeGames) {
      setShowPaywallModal(true);
      return;
    }
    router.push("/game/new");
  }

  function handleGamePress(id: string) {
    router.push(`/game/${id}`);
  }

  function handleDeleteGame(id: string) {
    deleteGame(id);
    setGames((prev) => prev.filter((g) => g.id !== id));
  }

  function handleSettings() {
    router.push("/settings");
  }

  return (
    <>
      <PaywallModal
        isOpen={showPaywallModal}
        onClose={() => setShowPaywallModal(false)}
        message="You can only have one game for free. Pay to unlock unlimited games!"
        onSuccess={() => {
          setHasPaidState(true);
          setShowPaywallModal(false);
        }}
      />

      <Stack.Screen
        options={{
          title: "Games",
          headerTitleStyle: { fontFamily: "Card" },
          headerRight: () => (
            <Pressable onPress={handleSettings} style={{ marginRight: 16 }}>
              <SettingsIcon size={24} color="#000" />
            </Pressable>
          ),
        }}
      />

      <Box className="flex-1 bg-gray-100 p-8">
        {games.length === 0 ? (
          <Box className="flex-1 justify-center items-center">
            <Text
              className="text-gray-500 text-center mb-4"
              style={{ fontFamily: "SpaceMonoRegular", fontSize: 16 }}
            >
              No games yet. Start your first game!
            </Text>
          </Box>
        ) : (
          <FlatList
            data={games}
            renderItem={({ item }) => (
              <GameCard game={item} onPress={handleGamePress} onDelete={handleDeleteGame} />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}

        <Box className="absolute bottom-8 left-8 right-8">
          <Button
            size="xl"
            onPress={handleStartNewGame}
            className="border-2 border-black rounded-xl"
            style={{ boxShadow: "4px 4px 0px #000" }}
          >
            <ButtonText style={{ fontFamily: "Card", fontSize: 18 }}>
              Start New Game
            </ButtonText>
          </Button>
        </Box>
      </Box>
    </>
  );
}
