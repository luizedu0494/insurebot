import { StyleSheet, Platform } from "react-native";

const stylesAcesso = StyleSheet.create({
  loginHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  loginTitle: {
    fontSize: 24,
    color: "#0f172a",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
    marginBottom: 4,
  },
  loginSubtitle: {
    fontSize: 14,
    color: "#64748b",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    gap: 12, 
  },
  inputLabel: {
    fontSize: 14,
    color: "#334155",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
    marginBottom: -4,
  },
  input: {
    width: "100%",
    backgroundColor: "#f8fafc", 
    borderWidth: 1,
    borderColor: "#e2e8f0",    
    borderRadius: 12,          
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: "#0f172a",
  },

  aboutText: {
    fontSize: 15,
    color: "#334155",
    lineHeight: 24,
    textAlign: "justify",
    marginBottom: 16,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  }
});

export default stylesAcesso;