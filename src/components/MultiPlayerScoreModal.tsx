import React, { useState, useEffect } from "react";
import { ScrollView, Pressable } from "react-native";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "./ui/modal";
import { Button, ButtonText } from "./ui/button";
import { Input, InputField } from "./ui/input";
import { Box } from "./ui/box";
import { Text } from "./ui/text";
import type { Player } from "../utils/mmkvStorage";
import { applyShootMoonBonus } from "../utils/gameLogic";

interface MultiPlayerScoreModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (
    scores: { [playerId: string]: number },
    bonusType?: "queenOfSpades" | "shootMoon" | null,
    bonusPlayerId?: string
  ) => void;
  players: Player[];
  editRoundScores?: { [playerId: string]: number };
  editBonusType?: "queenOfSpades" | "shootMoon" | null;
  editBonusPlayerId?: string;
  editRoundIndex?: number | null;
}

export function MultiPlayerScoreModal({
  visible,
  onClose,
  onSave,
  players,
  editRoundScores,
  editBonusType,
  editBonusPlayerId,
  editRoundIndex,
}: MultiPlayerScoreModalProps) {
  const [scores, setScores] = useState<{ [playerId: string]: string }>({});
  const [shootMoonPlayerId, setShootMoonPlayerId] = useState<string | null>(
    null
  );

  // Initialize scores when modal opens
  useEffect(() => {
    if (visible) {
      const initialScores: { [playerId: string]: string } = {};
      players.forEach((p) => {
        initialScores[p.id] = editRoundScores?.[p.id]?.toString() || "";
      });
      setScores(initialScores);

      // Set shoot moon state if editing
      if (editBonusType === "shootMoon" && editBonusPlayerId) {
        setShootMoonPlayerId(editBonusPlayerId);
      } else {
        setShootMoonPlayerId(null);
      }
    }
  }, [visible, players, editRoundScores, editBonusType, editBonusPlayerId]);

  function handleUpdateScore(playerId: string, value: string) {
    setScores({ ...scores, [playerId]: value });
  }

  function handleSave() {
    // Validate all scores are entered
    const allScoresValid = players.every((p) => {
      const score = scores[p.id];
      return score !== "" && !isNaN(parseInt(score, 10));
    });

    if (!allScoresValid) {
      alert("Please enter valid scores for all players");
      return;
    }

    // Convert scores to numbers
    let finalScores: { [playerId: string]: number } = {};
    players.forEach((p) => {
      finalScores[p.id] = parseInt(scores[p.id], 10);
    });

    // Apply Shoot the Moon if selected
    if (shootMoonPlayerId) {
      finalScores = applyShootMoonBonus(finalScores, shootMoonPlayerId);
      onSave(finalScores, "shootMoon", shootMoonPlayerId);
      return;
    }

    // No special scoring
    onSave(finalScores, null);
  }

  return (
    <Modal isOpen={visible} onClose={onClose}>
      <ModalBackdrop className="bg-black/50" />
      <ModalContent
        className=" p-4 w-[95%] "
        style={{ maxHeight: "95%", minHeight: 800 }}
      >
        <ModalHeader className="items-center justify-center">
          <Text
            className="text-xl font-semibold p-2"
            style={{ fontFamily: "Card" }}
          >
            {editRoundIndex !== null && editRoundIndex !== undefined
              ? `Edit Round ${editRoundIndex + 1}`
              : "New Round"}
          </Text>
        </ModalHeader>

        <ModalBody className="flex-1" style={{ minHeight: 800 }}>
          <ScrollView className="flex-1">
            <Box className="px-2 pb-2">
              {/* Player Scores */}
              <Box
                className="bg-white rounded-2xl border-2 border-black p-6 mb-6"
                style={{ boxShadow: "4px 4px 0px #000" }}
              >
                {players.map((player, index) => (
                  <Box
                    key={player.id}
                    className="flex-row items-center"
                    style={{
                      marginBottom: index === players.length - 1 ? 0 : 20,
                    }}
                  >
                    <Box className="items-center mr-4">
                      <Box
                        className="w-14 h-14 rounded-full border-2 border-black justify-center items-center mb-2"
                        style={{
                          backgroundColor: player.color,
                          boxShadow: "3px 3px 0px #000",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Card",
                            fontSize: 18,
                            color: "#000",
                          }}
                        >
                          {player.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                        </Text>
                      </Box>
                      <Text
                        style={{
                          fontFamily: "Card",
                          fontSize: 12,
                          textAlign: "center",
                        }}
                      >
                        {player.name}
                      </Text>
                    </Box>

                    <Box className="flex-1">
                      <Input
                        className="border-2 border-black rounded-xl bg-gray-50"
                        style={{ boxShadow: "2px 2px 0px #000" }}
                      >
                        <InputField
                          value={scores[player.id] || ""}
                          onChangeText={(v) => handleUpdateScore(player.id, v)}
                          placeholder="0"
                          keyboardType="numeric"
                          style={{ fontFamily: "Card", fontSize: 20 }}
                        />
                      </Input>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Shoot the Moon Section */}
              <Box
                className="bg-white rounded-2xl border-2 border-black p-6"
                style={{ boxShadow: "4px 4px 0px #000" }}
              >
                <Text
                  className="mb-4"
                  style={{ fontFamily: "Card", fontSize: 20 }}
                >
                  🌙 Shoot the Moon?
                </Text>

                <Text
                  className="mb-4 text-gray-600"
                  style={{ fontFamily: "SpaceMonoRegular", fontSize: 13 }}
                >
                  If someone shot the moon, they get 0 points and everyone else
                  gets 26.
                </Text>

                {/* Player Selection */}
                {players.map((player) => (
                  <Pressable
                    key={player.id}
                    onPress={() =>
                      setShootMoonPlayerId(
                        shootMoonPlayerId === player.id ? null : player.id
                      )
                    }
                    className="flex-row items-center p-4 mb-3 border-2 border-black rounded-xl"
                    style={{
                      backgroundColor:
                        shootMoonPlayerId === player.id ? "#fef3c7" : "#fff",
                      boxShadow:
                        shootMoonPlayerId === player.id
                          ? "3px 3px 0px #000"
                          : "none",
                    }}
                  >
                    <Box
                      className="w-10 h-10 rounded-full border-2 border-black justify-center items-center mr-3"
                      style={{
                        backgroundColor:
                          shootMoonPlayerId === player.id
                            ? player.color
                            : "#fff",
                        boxShadow: "2px 2px 0px #000",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Card",
                          fontSize: 14,
                          color: "#000",
                        }}
                      >
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </Text>
                    </Box>
                    <Text
                      style={{ fontFamily: "SpaceMonoRegular", fontSize: 16 }}
                    >
                      {player.name}
                    </Text>
                  </Pressable>
                ))}

                {shootMoonPlayerId && (
                  <Pressable
                    onPress={() => setShootMoonPlayerId(null)}
                    className="mt-2 p-3 border-2 border-black rounded-xl bg-gray-200"
                    style={{ boxShadow: "2px 2px 0px #000" }}
                  >
                    <Text
                      style={{
                        fontFamily: "SpaceMonoRegular",
                        fontSize: 14,
                        textAlign: "center",
                      }}
                    >
                      Clear Selection
                    </Text>
                  </Pressable>
                )}
              </Box>
            </Box>
          </ScrollView>
        </ModalBody>

        <ModalFooter className="bg-gray-100 justify-center mx-2 mt-4">
          <Button
            size="lg"
            variant="outline"
            onPress={onClose}
            className="flex-1"
            style={{ boxShadow: "4px 4px 0px #000" }}
          >
            <ButtonText className="text-black" style={{ fontFamily: "Card" }}>
              Cancel
            </ButtonText>
          </Button>
          <Button
            size="lg"
            onPress={handleSave}
            className="flex-1"
            style={{ boxShadow: "4px 4px 0px #000" }}
          >
            <ButtonText className="text-white" style={{ fontFamily: "Card" }}>
              Save
            </ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
