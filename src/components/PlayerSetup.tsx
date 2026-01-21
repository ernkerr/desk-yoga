/**
 * Reusable player setup component.
 * Used for adding and configuring players when creating a new game.
 */

import React from "react";
import { Box } from "@ui/box";
import { Button, ButtonText } from "@ui/button";
import { Input, InputField } from "@ui/input";
import { ColorPicker } from "@ui/ColorPicker";
import { X } from "lucide-react-native";
import type { Player } from "@core/types";

interface PlayerSetupProps {
  players: Player[];
  onUpdateName: (index: number, name: string) => void;
  onUpdateColor: (index: number, color: string) => void;
  onAddPlayer: () => void;
  onRemovePlayer: (index: number) => void;
  maxPlayers?: number;
}

export function PlayerSetup({
  players,
  onUpdateName,
  onUpdateColor,
  onAddPlayer,
  onRemovePlayer,
  maxPlayers = 5,
}: PlayerSetupProps) {
  return (
    <>
      {players.map((player, index) => (
        <Box
          key={player.id}
          className="bg-white rounded-2xl border-2 border-black p-4 mb-6"
          style={{ boxShadow: "4px 4px 0px #000" }}
        >
          <Box className="flex-row items-center mb-4 gap-2">
            <Box className="flex-1">
              <Input
                size="lg"
                className="border-2 border-black rounded-xl"
                style={{ boxShadow: "2px 2px 0px #000" }}
              >
                <InputField
                  value={player.name}
                  onChangeText={(text) => onUpdateName(index, text)}
                  placeholder={index === 0 ? "You" : `Player ${index + 1}`}
                  style={{ fontFamily: "SpaceMonoRegular" }}
                />
              </Input>
            </Box>
            {index > 0 && (
              <Button
                onPress={() => onRemovePlayer(index)}
                className="bg-red-500 border-2 border-black rounded-xl p-2"
                size="lg"
                style={{ boxShadow: "2px 2px 0px #000" }}
              >
                <X size={20} color="#fff" />
              </Button>
            )}
          </Box>

          <ColorPicker
            selectedColor={player.color}
            onSelect={(color) => onUpdateColor(index, color)}
          />
        </Box>
      ))}

      {players.length < maxPlayers && (
        <Button
          size="xl"
          onPress={onAddPlayer}
          className="border-2 border-black rounded-xl mb-6"
          style={{ boxShadow: "4px 4px 0px #000" }}
        >
          <ButtonText style={{ fontFamily: "Card", fontSize: 16 }}>
            + Add Player
          </ButtonText>
        </Button>
      )}
    </>
  );
}
