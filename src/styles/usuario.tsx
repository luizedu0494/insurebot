import { StyleSheet, Platform } from "react-native";

const stylesUsuario = StyleSheet.create({
 
  chatContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  messageList: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  balloon: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  userBalloon: {
    alignSelf: "flex-end",
    backgroundColor: "#0284c7",
    borderBottomRightRadius: 4,
  },
  userText: {
    fontSize: 15,
    color: "#ffffff",
    lineHeight: 22,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  botBalloon: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderBottomLeftRadius: 4,
  },
  botText: {
    fontSize: 15,
    color: "#0f172a",
    lineHeight: 22,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderColor: "#e2e8f0",
    gap: 8,
  },
  chatInput: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: "#0f172a",
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#0284c7",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },


  profileContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  profileContent: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 32,
    width: "100%",
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#e0f2fe", 
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#0284c7",
  },
  avatarText: {
    fontSize: 32,
    color: "#0284c7",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  userName: {
    fontSize: 20,
    color: "#0f172a",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
    textAlign: "center",
  },
  userEmail: {
    fontSize: 14,
    color: "#64748b",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
    marginTop: 2,
    textAlign: "center",
  },
  menuContainer: {
    width: "100%",
  },
  menuItem: {
    flexDirection: "row",      
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    justifyContent: "space-between", 
    width: "100%",
  },
  menuItemLeft: {
    flexDirection: "row",      
    alignItems: "center",
    gap: 12,                   
  },
  menuItemText: {
    fontSize: 16,
    color: "#334155",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  logoutItem: {
    borderBottomWidth: 0,
    marginTop: 24,
  },
  logoutText: {
    fontSize: 16,
    color: "#ef4444",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
});

export default stylesUsuario;