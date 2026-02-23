import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { useThemeStore, useOnboardingStore, useUserStore } from "@/store";
import { axiosInstance } from "@/axios";
import { onboardingStatusSchema } from "@mal/validators/src";

export default function Review() {
  const { colors } = useThemeStore();
  const { onboarding, clearOnboarding, setStep } = useOnboardingStore();
  const { user } = useUserStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { profile, document, address, consents } = onboarding ?? {};

  async function onSubmit() {
    setApiError(null);
    setLoading(true);
    try {
      await axiosInstance.post("/v1/onboarding/submit", {
        userId: user?.id,
        profile,
        document,
        address,
        consents,
        status: onboardingStatusSchema.enum.IN_PROGRESS,
      });
      // clearOnboarding();
      // setStep(1);
      router.replace("/(tabs)");
    } catch (err: any) {
      console.log(err);
      const message =
        err?.response?.data?.message ??
        "Something went wrong. Please try again.";
      setApiError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 24, paddingBottom: 48 }}
    >
      <View style={{ marginBottom: 32 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: colors.textPrimary,
            marginBottom: 6,
          }}
        >
          Review & submit
        </Text>
        <Text style={{ fontSize: 15, color: colors.textSecondary }}>
          Check your details before submitting.
        </Text>
      </View>

      <Section
        title="Profile"
        onEdit={() => router.push("/(onboarding)/Profile")}
        colors={colors}
      >
        <Row label="Full name" value={profile?.fullName} colors={colors} />
        <Row
          label="Date of birth"
          value={
            profile?.dateOfBirth
              ? new Date(profile.dateOfBirth).toLocaleDateString()
              : undefined
          }
          colors={colors}
        />
        <Row label="Nationality" value={profile?.nationality} colors={colors} />
      </Section>

      <Section
        title="Document"
        onEdit={() => router.push("/(onboarding)/Documents")}
        colors={colors}
      >
        <Row label="Type" value={document?.documentType} colors={colors} />
        <Row label="Number" value={document?.documentNumber} colors={colors} />
      </Section>

      <Section
        title="Address"
        onEdit={() => router.push("/(onboarding)/Address")}
        colors={colors}
      >
        <Row label="Address" value={address?.addressLine1} colors={colors} />
        <Row label="City" value={address?.city} colors={colors} />
        <Row label="Country" value={address?.country} colors={colors} />
      </Section>

      <Section
        title="Consents"
        onEdit={() => router.push("/(onboarding)/Concent")}
        colors={colors}
      >
        <Row
          label="Terms accepted"
          value={consents?.termsAccepted ? "Yes" : "No"}
          colors={colors}
        />
      </Section>

      {apiError && (
        <Text
          style={{
            color: colors.error,
            fontSize: 13,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          {apiError}
        </Text>
      )}

      <Button
        label="Submit application"
        onPress={onSubmit}
        loading={loading}
        size="lg"
      />
    </ScrollView>
  );
}

function Section({
  title,
  onEdit,
  colors,
  children,
}: {
  title: string;
  onEdit: () => void;
  colors: any;
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: colors.secondary,
        }}
      >
        <Text
          style={{ fontWeight: "600", fontSize: 15, color: colors.textPrimary }}
        >
          {title}
        </Text>
        <TouchableOpacity onPress={onEdit} hitSlop={8}>
          <Text style={{ fontSize: 13, color: colors.link, fontWeight: "500" }}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 16, paddingVertical: 12, gap: 10 }}>
        {children}
      </View>
    </View>
  );
}

function Row({
  label,
  value,
  colors,
}: {
  label: string;
  value?: string;
  colors: any;
}) {
  return (
    <View
      style={{ flexDirection: "row", justifyContent: "space-between", gap: 8 }}
    >
      <Text style={{ fontSize: 14, color: colors.textSecondary }}>{label}</Text>
      <Text
        style={{
          fontSize: 14,
          color: colors.textPrimary,
          fontWeight: "500",
          flexShrink: 1,
          textAlign: "right",
        }}
      >
        {value ?? "—"}
      </Text>
    </View>
  );
}
