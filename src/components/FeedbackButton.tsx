import { Button, ButtonText } from "./ui/button";
import { useRouter } from "expo-router";

type FeedbackButtonProps = {
  source?: string;
};

export default function FeedbackButton({ source }: FeedbackButtonProps) {
  const router = useRouter();

  return (
    <Button
      onPress={() => {
        if (source) {
          router.push({
            pathname: "/feedback-survey",
            params: { source },
          } as any);
          return;
        }
        router.push("/feedback-survey");
      }}
      size="lg"
      variant="outline"
      action="secondary"
      className="w-full"
    >
      <ButtonText>Give feedback</ButtonText>
    </Button>
  );
}
