import { useState } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useThemeStore } from "../store";

type InputVariant = "text" | "email" | "password";

type TextInputProps = RNTextInputProps & {
  variant?: InputVariant;
  label?: string;
  error?: string;
};

const variantProps: Record<InputVariant, Partial<RNTextInputProps>> = {
  text: {},
  email: {
    keyboardType: "email-address",
    autoCapitalize: "none",
    autoCorrect: false,
  },
  password: {
    secureTextEntry: true,
    autoCapitalize: "none",
    autoCorrect: false,
  },
};

export function TextInput({
  variant = "text",
  label,
  error,
  style,
  ...props
}: TextInputProps) {
  const { colors } = useThemeStore();

  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isPassword = variant === "password";
  const secureTextEntry = isPassword ? !passwordVisible : undefined;

  const borderColor = error
    ? colors.error
    : focused
      ? colors.ring
      : colors.inputBorder;

  return (
    <View style={{ gap: 6 }}>
      {label && (
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            fontWeight: "500",
          }}
        >
          {label}
        </Text>
      )}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.inputBg,
          borderWidth: 1,
          borderColor,
          borderRadius: 12,
          paddingHorizontal: 14,
        }}
      >
        <RNTextInput
          style={[
            {
              flex: 1,
              height: 44,
              color: colors.textPrimary,
              fontSize: 15,
            },
            style,
          ]}
          placeholderTextColor={colors.placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...variantProps[variant]}
          {...(isPassword && { secureTextEntry })}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setPasswordVisible((v) => !v)}
            hitSlop={8}
          >
            <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
              {passwordVisible ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={{ color: colors.error, fontSize: 12 }}>{error}</Text>
      )}
    </View>
  );
}
