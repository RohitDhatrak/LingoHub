import { Appearance } from "react-native";
const colorScheme = Appearance.getColorScheme();

export const theme = {
    primaryColor: colorScheme === "dark" ? "#2563eb" : "#93c5fd",
    secondaryColor: colorScheme === "dark" ? "#6b7280" : "#fff",
    textColor: colorScheme === "dark" ? "#fff" : "#000",
    lightText: "#4b5563",
    badge: colorScheme === "dark" ? "#991b1b" : "#fca5a5",
    background: "#d9dbda",
    error: colorScheme === "dark" ? "#fca5a5" : "#991b1b",
};
