import { Switch } from "react-native";
import { Text, View } from "@/components/Themed";
import { useThemeStore } from "../../store";

export default function SettingsScreen() {
  const { theme, colors, setTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 32 }}>
        Settings
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.inputBg,
        }}
      >
        <View style={{ gap: 2, backgroundColor: "transparent" }}>
          <Text style={{ fontSize: 15, fontWeight: "600" }}>Dark mode</Text>
          <Text style={{ fontSize: 13, color: colors.textSecondary }}>
            {isDark ? "On" : "Off"}
          </Text>
        </View>

        <Switch
          value={isDark}
          onValueChange={(value) => setTheme(value ? "dark" : "light")}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.background}
        />
      </View>
    </View>
  );
}
