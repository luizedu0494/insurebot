import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from "react-native";
import styles from "../styles/global";
import { router } from "expo-router";

export default function Vindas(){
    return(
       
        <View style={[styles.container, { flex: 1, justifyContent: 'space-between', paddingVertical: 16 }]}>
            
            
            <View style={{ flex: 0.5 }} />

            <View style={styles.headerContainer}>
                <Image style={styles.image} source={require('../assets/logo.png')}/>  
                <Text style={styles.botTitle}>InsureBot</Text>
                <Text style={styles.botSubtitle}>Chatbot para tirar duvidas sobre seguros</Text>
            </View>

            <View style={{ flex: 1 }} />

            <View style={[styles.buttonContainer, { width: '100%', paddingHorizontal: 4 }]}>
                <TouchableOpacity style={styles.buttonPrimary} activeOpacity={0.8} onPress={()=> router.push("/acesso/login")}>
                    <Text style={styles.buttonPrimaryText}>Logar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSecondary} activeOpacity={0.7} onPress={()=> router.push("/acesso/register")}>
                    <Text style={styles.buttonSecondaryText}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonTextOnly} onPress={()=> router.push("/acesso/sobre")}>
                    <Text style={styles.buttonTextOnlyText}>Sobre a aplicação</Text>
                </TouchableOpacity>
            </View>

            <View style={{ height: 8 }} />
        </View>
    )
}