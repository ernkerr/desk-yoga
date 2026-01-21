/**
 * Reusable game card component for the games list.
 */

import React from "react";
import { Pressable } from "react-native";
import { Box } from "@ui/box";
import { Text } from "@ui/text";
import { Avatar, AvatarFallbackText } from "@ui/avatar";
import type { BaseGame } from "@core/types";
import { getPlayerInitials } from "@core/playerManager";
import { formatTimeAgo } from "@core/utils";

interface GameCardProps<T extends BaseGame> {
  game: T;
  onPress: (id: string) => void;
  getStatusText?: (game: T) => string;
}

export function GameCard<T extends BaseGame>({
  game,
  onPress,
  getStatusText,
}: GameCardProps<T>) {
  const isInProgress = game.status === "in_progress";

  const statusText = getStatusText
    ? getStatusText(game)
    : isInProgress
    ? "Continue Game"
    : `Winner: ${
        game.players.find((p) => p.id === game.winner)?.name || "Unknown"
      }`;

  const timeAgo = formatTimeAgo(game.date);

  return (
    <Pressable
      className="bg-white rounded-2xl border-2 border-black p-4 mb-8 mr-2"
      onPress={() => onPress(game.id)}
      style={{ boxShadow: "4px 4px 0px #000" }}
    >
      {/* Player Avatars Row */}
      <Box className="flex-row mb-2">
        {game.players.slice(0, 5).map((player, index) => (
          <Avatar
            key={player.id}
            size="lg"
            className="border-2 border-black"
            style={{
              backgroundColor: player.color || "#fff",
              boxShadow: "2px 2px 0px #000",
              marginLeft: index > 0 ? -8 : 0,
              zIndex: game.players.length - index,
            }}
          >
            <AvatarFallbackText style={{ fontFamily: "Card", color: "#000" }}>
              {getPlayerInitials(player.name)}
            </AvatarFallbackText>
          </Avatar>
        ))}
      </Box>

      {/* Player Names */}
      <Text
        className="text-black mb-1"
        style={{ fontFamily: "SpaceMonoRegular" }}
      >
        {game.players.map((p) => p.name).join(", ")}
      </Text>

      {/* Status */}
      <Text
        className="text-black font-bold text-lg"
        style={{ fontFamily: "Card" }}
      >
        {statusText}
      </Text>

      {/* Time */}
      <Text
        className="text-gray-500 mt-1 text-sm"
        style={{ fontFamily: "SpaceMonoRegular" }}
      >
        {timeAgo}
      </Text>
    </Pressable>
  );
}
