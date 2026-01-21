import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { Button, ButtonText } from "@ui/button";
import { Input, InputField } from "@ui/input";
import { Box } from "@ui/box";
import { Text } from "@ui/text";
import { COLOR_PICKER_PALETTE } from "@ui/ColorPicker";
import {
  getGames,
  saveGames,
  getUserName,
  generateId,
  getTargetScore,
} from "@core/storage";
import type { Player } from "@core/types";
import { FEATURES } from "@config/app.config";
import { PlayerSetup } from "@components/PlayerSetup";
import type { HeartsGame } from "@games/hearts";

// Screen for creating a new game with multiple players
export default function NewGameScreen() {
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [targetScore, setTargetScoreState] = useState("");

  // Initialize with user as first player
  useEffect(() => {
    const userName = getUserName();
    const defaultTarget = getTargetScore();
    setTargetScoreState(defaultTarget.toString());

    const userPlayer: Player = {
      id: generateId(),
      name: userName,
      color: COLOR_PICKER_PALETTE[0],
      isUser: true,
    };
    setPlayers([userPlayer]);
  }, []);

  function handleUpdatePlayerName(index: number, name: string) {
    const updated = [...players];
    updated[index] = { ...updated[index], name };
    setPlayers(updated);
  }

  function handleUpdatePlayerColor(index: number, color: string) {
    const updated = [...players];
    updated[index] = { ...updated[index], color };
    setPlayers(updated);
  }

  function handleAddPlayer() {
    if (players.length >= FEATURES.maxPlayers) return;

    const newPlayer: Player = {
      id: generateId(),
      name: "",
      color: COLOR_PICKER_PALETTE[players.length % COLOR_PICKER_PALETTE.length],
      isUser: false,
    };
    setPlayers([...players, newPlayer]);
  }

  function handleRemovePlayer(index: number) {
    // Can't remove user (first player)
    if (index === 0) return;
    const updated = players.filter((_, i) => i !== index);
    setPlayers(updated);
  }

  function handleCreateGame() {
    // Validation
    if (players.length < FEATURES.minPlayers) {
      alert(`You need at least ${FEATURES.minPlayers} players to start a game`);
      return;
    }

    const allNamesValid = players.every((p) => p.name.trim().length > 0);
    if (!allNamesValid) {
      alert("All players must have names");
      return;
    }

    const target = parseInt(targetScore, 10);
    if (isNaN(target) || target <= 0) {
      alert("Please enter a valid target score");
      return;
    }

    // Create new game
    const newGame: HeartsGame = {
      id: generateId(),
      date: new Date().toISOString(),
      players: players.map((p) => ({ ...p, name: p.name.trim() })),
      rounds: [],
      winner: null,
      targetScore: target,
      status: "in_progress",
    };

    // Save to storage
    const games = getGames<HeartsGame>();
    games.push(newGame);
    saveGames(games);

    // Navigate to game detail
    router.replace(`/game/${newGame.id}`);
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "New Game",
          headerTitleStyle: { fontFamily: "Card" },
        }}
      />

      <ScrollView className="flex-1 bg-gray-100">
        <Box className="p-8">
          <PlayerSetup
            players={players}
            onUpdateName={handleUpdatePlayerName}
            onUpdateColor={handleUpdatePlayerColor}
            onAddPlayer={handleAddPlayer}
            onRemovePlayer={handleRemovePlayer}
            maxPlayers={FEATURES.maxPlayers}
          />

          <Box
            className="bg-white rounded-2xl border-2 border-black p-4 mb-6"
            style={{ boxShadow: "4px 4px 0px #000" }}
          >
            <Text
              className="mb-2 font-bold text-lg"
              style={{ fontFamily: "Card" }}
            >
              Target Score
            </Text>
            <Input
              size="lg"
              className="border-2 border-black rounded-xl"
              style={{ boxShadow: "2px 2px 0px #000" }}
            >
              <InputField
                value={targetScore}
                onChangeText={setTargetScoreState}
                placeholder="100"
                keyboardType="numeric"
                style={{ fontFamily: "SpaceMonoRegular" }}
              />
            </Input>
            <Text
              className="text-gray-600 mt-2 text-sm"
              style={{ fontFamily: "SpaceMonoRegular" }}
            >
              Game ends when any player reaches this score. Player with lowest
              score wins!
            </Text>
          </Box>

          <Box className="flex-row gap-4 mb-4">
            <Button
              size="xl"
              onPress={() => router.back()}
              className="flex-1 bg-white border-2 border-black rounded-xl"
              style={{ boxShadow: "4px 4px 0px #000" }}
            >
              <ButtonText
                style={{ fontFamily: "Card", fontSize: 16, color: "#000" }}
              >
                Cancel
              </ButtonText>
            </Button>
            <Button
              size="xl"
              onPress={handleCreateGame}
              className="flex-1  border-2 border-black rounded-xl"
              style={{ boxShadow: "4px 4px 0px #000" }}
            >
              <ButtonText style={{ fontFamily: "Card", fontSize: 16 }}>
                Start Game
              </ButtonText>
            </Button>
          </Box>
        </Box>
      </ScrollView>
    </>
  );
}
