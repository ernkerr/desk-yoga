// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { Button, ButtonText } from "@ui/button";
// import { Input, InputField } from "@ui/input";
// import { getUserName, setUserName, clearAllData } from "@/src/utils/storage";
// import { Stack, useRouter } from "expo-router";
// import { Box } from "@ui/box";
// import RestoreButton from "@components/RestoreButton";

// // This screen lets the user view and change their settings
// export default function SettingsScreen() {
//   const router = useRouter();
//   // State to hold the user's name
//   const [name, setName] = useState("");

//   // Load the user's name when the screen loads
//   useEffect(() => {
//     setName(getUserName());
//   }, []);

//   // Handler for saving the new name
//   function handleSave() {
//     setUserName(name.trim() || "You");
//     router.replace("/home");
//   }

//   // Handler for clearing storage
//   function handleClearStorage() {
//     Alert.alert(
//       "Are you sure?",
//       "This will delete all app data and cannot be undone.",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: () => {
//             clearAllData();
//             alert("Storage cleared! (restart app to see effect)");
//           },
//         },
//       ],
//     );
//   }

//   return (
//     <>
//       <Stack.Screen
//         options={{
//           title: "Settings",
//           headerTitleStyle: {
//             fontFamily: "Card",
//           },
//         }}
//       />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         className="flex-1"
//       >
//         <ScrollView className="flex-1">
//           <View className="flex-1 p-4 pt-0 ">
//             <Box className=" rounded-lg p-4 mb-2">
//               <Text
//                 className="text-lg font-semibold mb-2 "
//                 style={{ fontFamily: "Card" }}
//               >
//                 Name
//               </Text>
//               <Input
//                 size="lg"
//                 isDisabled={false}
//                 isInvalid={false}
//                 isReadOnly={false}
//                 style={{
//                   boxShadow: "4px 4px 0px #000",
//                 }}
//               >
//                 <InputField
//                   placeholder="Name"
//                   value={name}
//                   onChangeText={setName}
//                   style={{ fontFamily: "SpaceMonoRegular" }}
//                 />
//               </Input>
//             </Box>

//             {/* Restore purchase */}
//             <RestoreButton />

//             {/* Save */}
//             <View className="flex-row mt-2 mb-28">
//               <Button
//                 size="lg"
//                 onPress={handleSave}
//                 className="flex-1"
//                 style={{
//                   boxShadow: "4px 4px 0px #000",
//                 }}
//               >
//                 <ButtonText className="text-white">Save</ButtonText>
//               </Button>
//             </View>

//             {/* Button to clear storage */}
//             <Button
//               size="sm"
//               onPress={handleClearStorage}
//               className="mt-[95%] mb-16 bg-white w-[50%] ml-[25%] "
//               style={{
//                 boxShadow: "4px 4px 0px #000",
//               }}
//             >
//               <ButtonText className="text-black">Reset App</ButtonText>
//             </Button>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </>
//   );
// }
