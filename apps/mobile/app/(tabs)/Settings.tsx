import { useState } from "react";
import { Switch, TouchableOpacity, Alert } from "react-native";
import { Text, View } from "@/components/Themed";
import { useThemeStore, useUserStore, useSessionStore } from "../../store";
import { axiosInstance } from "@/axios";

export default function SettingsScreen() {
  const { theme, colors, setTheme } = useThemeStore();
  const { clearUser } = useUserStore();
  const { clearSession } = useSessionStore();
  const isDark = theme === "dark";
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await axiosInstance.post("/v1/auth/logout");
    } catch {
      // proceed regardless — clear local state
    } finally {
      clearUser();
      clearSession();
      setLoggingOut(false);
    }
  }

  function confirmLogout() {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: handleLogout },
    ]);
  }

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
          marginBottom: 12,
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

      <TouchableOpacity
        onPress={confirmLogout}
        disabled={loggingOut}
        style={{
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.error,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "600", color: colors.error }}>
          {loggingOut ? "Logging out…" : "Log out"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
