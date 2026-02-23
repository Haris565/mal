import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button } from "@/components/Button";
import { useThemeStore, useOnboardingStore } from "@/store";

export default function Concent() {
  const { colors } = useThemeStore();
  const { updateOnboarding, setStep, onboarding } = useOnboardingStore();
  const router = useRouter();

  const [accepted, setAccepted] = useState(
    onboarding?.consents?.termsAccepted ?? false,
  );
  const [error, setError] = useState<string | null>(null);

  function onSubmit() {
    if (!accepted) {
      setError("You must accept the terms to continue.");
      return;
    }
    updateOnboarding({ consents: { termsAccepted: true } });
    setStep(5);
    router.push("/(onboarding)/Review");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ marginBottom: 8 }}>
          <Text style={{ fontSize: 13, color: colors.textSecondary, marginBottom: 24 }}>
            Step 4 of 4
          </Text>
          <Text
            style={{ fontSize: 28, fontWeight: "700", color: colors.textPrimary, marginBottom: 6 }}
          >
            Terms & consent
          </Text>
          <Text style={{ fontSize: 15, color: colors.textSecondary }}>
            Please review and accept before continuing.
          </Text>
        </View>

        <View
          style={{
            marginTop: 32,
            padding: 16,
            backgroundColor: colors.secondary,
            borderRadius: 12,
            marginBottom: 24,
          }}
        >
          <Text style={{ color: colors.textPrimary, fontSize: 14, lineHeight: 22 }}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
            Your personal information will be processed in accordance with
            applicable data protection laws and used solely for identity
            verification purposes.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            setAccepted((v) => !v);
            setError(null);
          }}
          style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 8 }}
          activeOpacity={0.7}
        >
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              borderWidth: 2,
              borderColor: accepted ? colors.primary : colors.inputBorder,
              backgroundColor: accepted ? colors.primary : "transparent",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {accepted && (
              <Text style={{ color: colors.buttonText, fontSize: 13, fontWeight: "700" }}>
                ✓
              </Text>
            )}
          </View>
          <Text style={{ color: colors.textPrimary, fontSize: 15, flex: 1 }}>
            I accept the terms and conditions
          </Text>
        </TouchableOpacity>

        {error && (
          <Text style={{ color: colors.error, fontSize: 12, marginBottom: 8 }}>
            {error}
          </Text>
        )}

        <Button
          label="Continue"
          onPress={onSubmit}
          style={{ marginTop: 16 }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
