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

const addressFormSchema = z.object({
  addressLine1: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

type AddressFormFields = z.infer<typeof addressFormSchema>;

export default function Address() {
  const { colors } = useThemeStore();
  const { updateOnboarding, setStep, onboarding } = useOnboardingStore();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormFields>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      addressLine1: onboarding?.address?.addressLine1 ?? "",
      city: onboarding?.address?.city ?? "",
      country: onboarding?.address?.country ?? "",
    },
  });

  function onSubmit(data: AddressFormFields) {
    updateOnboarding({ address: data });
    setStep(4);
    router.push("/(onboarding)/Concent");
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
            Step 3 of 4
          </Text>
          <Text
            style={{ fontSize: 28, fontWeight: "700", color: colors.textPrimary, marginBottom: 6 }}
          >
            Your address
          </Text>
          <Text style={{ fontSize: 15, color: colors.textSecondary }}>
            Where are you currently living?
          </Text>
        </View>

        <View style={{ gap: 16, marginTop: 32 }}>
          <Controller
            control={control}
            name="addressLine1"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Address"
                placeholder="123 Main Street"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.addressLine1?.message}
                returnKeyType="next"
              />
            )}
          />

          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="City"
                placeholder="Helsinki"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.city?.message}
                returnKeyType="next"
              />
            )}
          />

          <Controller
            control={control}
            name="country"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Country"
                placeholder="Finland"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.country?.message}
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
