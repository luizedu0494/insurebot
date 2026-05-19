import { StyleSheet, Platform } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 24, 
  },
  headerContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width: 180,            
    height: 54,            
    resizeMode: "contain",
    marginBottom: 20, 
  },
  botTitle: {
    fontSize: 28,          
    color: "#0f172a",      
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
    letterSpacing: -0.5,
    marginBottom: 6, 
  },
  botSubtitle: {
    fontSize: 14,          
    color: "#64748b",      
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-light" }),
    textAlign: "center",   
    marginBottom: 40,
  },
  buttonContainer: {
    width: "100%",          
    paddingBottom: 20,      
    gap: 12,                
  },
  buttonPrimary: {
    backgroundColor: "#0284c7", 
    paddingVertical: 14,
    borderRadius: 12,           
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimaryText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#cbd5e1",     
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSecondaryText: {
    color: "#334155",           
    fontSize: 16,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  buttonTextOnly: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  buttonTextOnlyText: {
    color: "#64748b",
    fontSize: 14,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
    textDecorationLine: "underline",
  }
});

export default globalStyles;