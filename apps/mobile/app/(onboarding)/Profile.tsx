import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/Button";
import { useThemeStore, useOnboardingStore } from "@/store";

const profileFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD format"),
  nationality: z.string().min(1, "Nationality is required"),
});

type ProfileFormFields = z.infer<typeof profileFormSchema>;

export default function Profile() {
  const { colors } = useThemeStore();
  const { updateOnboarding, setStep, onboarding } = useOnboardingStore();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormFields>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: onboarding?.profile?.fullName ?? "",
      dateOfBirth: onboarding?.profile?.dateOfBirth
        ? new Date(onboarding.profile.dateOfBirth).toISOString().slice(0, 10)
        : "",
      nationality: onboarding?.profile?.nationality ?? "",
    },
  });

  function onSubmit(data: ProfileFormFields) {
    updateOnboarding({
      profile: {
        fullName: data.fullName,
        dateOfBirth: new Date(data.dateOfBirth),
        nationality: data.nationality,
      },
    });
    setStep(2);
    router.push("/(onboarding)/Documents");
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
            Step 1 of 4
          </Text>
          <Text
            style={{ fontSize: 28, fontWeight: "700", color: colors.textPrimary, marginBottom: 6 }}
          >
            Your profile
          </Text>
          <Text style={{ fontSize: 15, color: colors.textSecondary }}>
            Tell us a bit about yourself.
          </Text>
        </View>

        <View style={{ gap: 16, marginTop: 32 }}>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Full name"
                placeholder="John Doe"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.fullName?.message}
                returnKeyType="next"
              />
            )}
          />

          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Date of birth"
                placeholder="YYYY-MM-DD"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.dateOfBirth?.message}
                returnKeyType="next"
                keyboardType="numbers-and-punctuation"
              />
            )}
          />

          <Controller
            control={control}
            name="nationality"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Nationality"
                placeholder="e.g. Finnish"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.nationality?.message}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
          />

          <Button
            label="Continue"
            onPress={handleSubmit(onSubmit)}
            style={{ marginTop: 8 }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
