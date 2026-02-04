import { Redirect } from "expo-router";
import { getUserName } from "@/src/core";

export default function Index() {
  if (getUserName() === "") {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/home" />;
}
