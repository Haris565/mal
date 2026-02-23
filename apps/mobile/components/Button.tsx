import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useThemeStore } from "../store";

type ButtonVariant = "primary" | "secondary" | "destructive" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = TouchableOpacityProps & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

const sizeStyles: Record<ButtonSize, { height: number; paddingHorizontal: number; fontSize: number }> = {
  sm: { height: 36, paddingHorizontal: 14, fontSize: 13 },
  md: { height: 44, paddingHorizontal: 20, fontSize: 15 },
  lg: { height: 52, paddingHorizontal: 24, fontSize: 16 },
};

export function Button({
  label,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const { colors } = useThemeStore();

  const isDisabled = disabled || loading;

  const variantStyles: Record<ButtonVariant, { backgroundColor: string; borderColor: string; textColor: string }> = {
    primary: {
      backgroundColor: isDisabled ? colors.buttonDisabled : colors.primary,
      borderColor: "transparent",
      textColor: colors.buttonText,
    },
    secondary: {
      backgroundColor: colors.secondary,
      borderColor: "transparent",
      textColor: colors.secondaryForeground,
    },
    destructive: {
      backgroundColor: isDisabled ? colors.buttonDisabled : colors.destructive,
      borderColor: "transparent",
      textColor: "#FFFFFF",
    },
    outline: {
      backgroundColor: "transparent",
      borderColor: colors.border,
      textColor: colors.textPrimary,
    },
    ghost: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: colors.textPrimary,
    },
  };

  const { backgroundColor, borderColor, textColor } = variantStyles[variant];
  const { height, paddingHorizontal, fontSize } = sizeStyles[size];

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={isDisabled}
      style={[
        {
          height,
          paddingHorizontal,
          backgroundColor,
          borderWidth: variant === "outline" ? 1 : 0,
          borderColor,
          borderRadius: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          opacity: isDisabled && !loading ? 0.5 : 1,
        },
        style,
      ]}
      {...props}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={textColor}
        />
      )}
      <Text
        style={{
          color: textColor,
          fontSize,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
