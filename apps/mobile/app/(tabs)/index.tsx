import { useRouter } from "expo-router";
import { Text, View } from "../../components/Themed";
import {
  useUserStore,
  useOnboardingStore,
  useThemeStore,
  useSessionStore,
} from "../../store";
import { Button } from "../../components/Button";
import { axiosInstance } from "../../axios";
import { useEffect } from "react";

export default function TabOneScreen() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const onboarding = useOnboardingStore((s) => s.onboarding);
  const session = useSessionStore((s) => s.session);
  const { colors } = useThemeStore();

  const hasStarted = onboarding !== null;
  const firstName = user?.fullName?.split(" ")[0] ?? "there";

  const getVerificationStatus = async () => {
    const response = await fetch(
      "http://localhost:3000/v1/verification/status",
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        method: "GET",
      },
    );

    const onboarding = await response.json();

    console.log("From getVerificationStatus", onboarding);

    useOnboardingStore.setState({ onboarding });
  };

  useEffect(() => {
    getVerificationStatus();
  }, [session]);

  return (
    <View className="flex-1 px-6 pt-20 gap-8">
      {/* Header */}
      <View className="gap-1">
        <Text className="text-sm" style={{ color: colors.textSecondary }}>
          Welcome back
        </Text>
        <Text className="text-3xl font-bold">{user?.fullName ?? "—"}</Text>
      </View>

      {/* Onboarding card */}
      <View
        className="rounded-2xl border p-5 gap-4"
        style={{
          backgroundColor: colors.secondary,
          borderColor: colors.border,
        }}
      >
        <View
          className="w-12 h-12 rounded-xl  items-center justify-center"
          style={{ backgroundColor: colors.muted }}
        >
          <Text className="text-2xl">📋</Text>
        </View>

        <View className="gap-1.5 p-5">
          <Text className="text-base font-semibold">
            {hasStarted
              ? "Continue your application"
              : "Start your application"}
          </Text>
          <Text
            className="text-sm leading-5"
            style={{ color: colors.textSecondary }}
          >
            {hasStarted
              ? "Pick up where you left off. Your progress has been saved."
              : `Hi ${firstName}, we need a few details to verify your identity before you can start.`}
          </Text>
        </View>

        {["IN_PROGRESS", "APPROVED", "REJECTED", "MANUAL_REVIEW"].includes(
          onboarding?.status,
        ) ? (
          <View className="p-2">
            <Text>Your application is {onboarding?.status?.toLowerCase()}</Text>
          </View>
        ) : (
          <Button
            label={hasStarted ? "Resume Onboarding" : "Start Onboarding"}
            size="lg"
            style={{ alignSelf: "stretch", marginTop: 4 }}
            onPress={() => router.push("/(onboarding)/Profile")}
          />
        )}
      </View>
    </View>
  );
}
