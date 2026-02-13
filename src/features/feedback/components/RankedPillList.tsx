import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  PanResponder,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ROW_HEIGHT = 64;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function moveItem<T>(list: T[], fromIndex: number, toIndex: number): T[] {
  const copy = [...list];
  const [item] = copy.splice(fromIndex, 1);
  copy.splice(toIndex, 0, item);
  return copy;
}

type RankedRowProps = {
  itemKey: string;
  label: string;
  index: number;
  draggingKey: string | null;
  dragY: Animated.Value;
  onDragStart: (key: string) => void;
  onDragMove: (dy: number) => void;
  onDragEnd: () => void;
};

function RankedRow({
  itemKey,
  label,
  index,
  draggingKey,
  dragY,
  onDragStart,
  onDragMove,
  onDragEnd,
}: RankedRowProps) {
  const isDragging = draggingKey === itemKey;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => onDragStart(itemKey),
      onPanResponderMove: (_evt, gestureState) => onDragMove(gestureState.dy),
      onPanResponderRelease: () => onDragEnd(),
      onPanResponderTerminate: () => onDragEnd(),
    }),
  ).current;

  return (
    <Animated.View
      style={[
        isDragging
          ? {
              transform: [{ translateY: dragY }],
              zIndex: 10,
            }
          : null,
      ]}
    >
      <View
        className={`h-16 flex-row items-center justify-between rounded-full border-2 px-4 ${
          isDragging
            ? "bg-[#FFF3E6] border-black"
            : "bg-white border-gray-200"
        }`}
        style={
          isDragging
            ? {
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
                elevation: 4,
              }
            : undefined
        }
      >
        <View className="flex-row items-center gap-3 flex-1">
          <View className="h-7 w-7 rounded-full bg-[#F1E2D2] items-center justify-center">
            <Text className="text-sm font-bold text-[#1B1B1B]">
              {index + 1}
            </Text>
          </View>
          <Text className="flex-1 font-semibold text-gray-700" numberOfLines={2}>
            {label}
          </Text>
        </View>

        <View {...panResponder.panHandlers} className="pl-3 py-2 -mr-2">
          <Ionicons
            name="reorder-three"
            size={24}
            color={isDragging ? "#111827" : "#6B7280"}
          />
        </View>
      </View>
    </Animated.View>
  );
}

type RankedPillListProps = {
  order: string[];
  labelsByKey: Map<string, string>;
  onOrderChange: (nextOrder: string[]) => void;
  onDraggingChange?: (dragging: boolean) => void;
};

export function RankedPillList({
  order,
  labelsByKey,
  onOrderChange,
  onDraggingChange,
}: RankedPillListProps) {
  const [draggingKey, setDraggingKey] = useState<string | null>(null);
  const dragY = useRef(new Animated.Value(0)).current;

  const orderRef = useRef<string[]>(order);
  const activeKeyRef = useRef<string | null>(null);
  const initialIndexRef = useRef<number>(0);

  useEffect(() => {
    orderRef.current = order;
  }, [order]);

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const startDrag = (key: string) => {
    if (activeKeyRef.current) return;

    const initialIndex = orderRef.current.indexOf(key);
    if (initialIndex === -1) return;

    activeKeyRef.current = key;
    initialIndexRef.current = initialIndex;
    dragY.setValue(0);
    setDraggingKey(key);
    onDraggingChange?.(true);
  };

  const handleDragMove = (dy: number) => {
    const activeKey = activeKeyRef.current;
    if (!activeKey) return;

    const currentOrder = orderRef.current;
    const initialIndex = initialIndexRef.current;
    const currentIndex = currentOrder.indexOf(activeKey);
    if (currentIndex === -1) return;

    const fingerY = initialIndex * ROW_HEIGHT + dy;
    const targetIndex = clamp(
      Math.floor((fingerY + ROW_HEIGHT / 2) / ROW_HEIGHT),
      0,
      currentOrder.length - 1,
    );

    if (targetIndex !== currentIndex) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const nextOrder = moveItem(currentOrder, currentIndex, targetIndex);
      orderRef.current = nextOrder;
      onOrderChange(nextOrder);
    }

    const translateY = dy + (initialIndex - targetIndex) * ROW_HEIGHT;
    dragY.setValue(translateY);
  };

  const endDrag = () => {
    if (!activeKeyRef.current) return;

    Animated.spring(dragY, {
      toValue: 0,
      useNativeDriver: true,
      friction: 8,
      tension: 80,
    }).start(() => {
      dragY.setValue(0);
    });

    activeKeyRef.current = null;
    setDraggingKey(null);
    onDraggingChange?.(false);
  };

  return (
    <View className="gap-2">
      {order.map((key, index) => (
        <RankedRow
          key={key}
          itemKey={key}
          label={labelsByKey.get(key) ?? key}
          index={index}
          draggingKey={draggingKey}
          dragY={dragY}
          onDragStart={startDrag}
          onDragMove={handleDragMove}
          onDragEnd={endDrag}
        />
      ))}
    </View>
  );
}

