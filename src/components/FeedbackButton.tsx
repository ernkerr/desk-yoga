import { Button, ButtonText } from "./ui/button";
import { useRouter } from "expo-router";

export default function FeedbackButton() {
  const router = useRouter();

  return (
    <Button
      onPress={() => router.push("/feedback-survey")}
      size="lg"
      variant="outline"
      action="secondary"
      className="w-full"
    >
      <ButtonText>Give feedback</ButtonText>
    </Button>
  );
}
