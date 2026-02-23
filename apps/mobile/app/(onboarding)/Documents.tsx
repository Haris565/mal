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

const documentFormSchema = z.object({
  documentType: z.string().min(1, "Document type is required"),
  documentNumber: z.string().min(1, "Document number is required"),
});

type DocumentFormFields = z.infer<typeof documentFormSchema>;

export default function Documents() {
  const { colors } = useThemeStore();
  const { updateOnboarding, setStep, onboarding } = useOnboardingStore();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DocumentFormFields>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      documentType: onboarding?.document?.documentType ?? "",
      documentNumber: onboarding?.document?.documentNumber ?? "",
    },
  });

  function onSubmit(data: DocumentFormFields) {
    updateOnboarding({ document: data });
    setStep(3);
    router.push("/(onboarding)/Address");
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
            Step 2 of 4
          </Text>
          <Text
            style={{ fontSize: 28, fontWeight: "700", color: colors.textPrimary, marginBottom: 6 }}
          >
            Identity document
          </Text>
          <Text style={{ fontSize: 15, color: colors.textSecondary }}>
            Provide your identity document details.
          </Text>
        </View>

        <View style={{ gap: 16, marginTop: 32 }}>
          <Controller
            control={control}
            name="documentType"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Document type"
                placeholder="e.g. Passport, National ID"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.documentType?.message}
                returnKeyType="next"
              />
            )}
          />

          <Controller
            control={control}
            name="documentNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Document number"
                placeholder="e.g. AB1234567"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.documentNumber?.message}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
                autoCapitalize="characters"
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
