import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/Button";
import { useThemeStore, useUserStore, useSessionStore } from "@/store";
import { axiosInstance } from "@/axios";
import { loginSchema } from "@mal/validators";
import type { z } from "zod";

type FormFields = z.infer<typeof loginSchema>;

export default function Signin() {
  const { colors } = useThemeStore();
  const { setUser } = useUserStore();
  const { setSession } = useSessionStore();
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: FormFields) {
    setApiError(null);
    try {
      const res = await axiosInstance.post("/login", data);
      setUser(res.data.user);
      setSession(res.data.session);
    } catch (err: any) {
      const message =
        err?.response?.data?.message ?? "Something went wrong. Please try again.";
      setApiError(message);
    }
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
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{ fontSize: 28, fontWeight: "700", color: colors.textPrimary, marginBottom: 6 }}
          >
            Welcome back
          </Text>
          <Text style={{ fontSize: 15, color: colors.textSecondary }}>
            Sign in to your account to continue.
          </Text>
        </View>

        <View style={{ gap: 16 }}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                variant="email"
                label="Email"
                placeholder="you@example.com"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                returnKeyType="next"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                variant="password"
                label="Password"
                placeholder="••••••••"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
          />

          {apiError && (
            <Text style={{ color: colors.error, fontSize: 13, textAlign: "center" }}>
              {apiError}
            </Text>
          )}

          <Button
            label="Sign in"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            style={{ marginTop: 8 }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 24,
            gap: 4,
          }}
        >
          <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/Signup")}>
            <Text style={{ color: colors.link, fontSize: 14, fontWeight: "600" }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
