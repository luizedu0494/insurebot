import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase'; // Verifique se esse caminho está certinho
import { router } from 'expo-router';
import globalStyles from '../../styles/global';   
import stylesAcesso from '../../styles/acesso';   

// CORREÇÃO: Garantindo o export default correto para o Expo Router encontrar a tela
export default function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, digite o seu e-mail.");
      return;
    }

    setLoading(true);

    try {
      // Solicita o envio do e-mail de redefinição gratuito no plano Spark
      await sendPasswordResetEmail(auth, email.trim());
      
      Alert.alert(
        "E-mail Enviado!", 
        "Verifique sua caixa de entrada para redefinir sua senha.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    } catch (error: any) {
      console.log(error);

      if (error.code === 'auth/user-not-found') {
        Alert.alert("Erro", "Este e-mail não está cadastrado no sistema.");
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert("Erro", "O formato do e-mail digitado é inválido.");
      } else {
        Alert.alert("Erro", "Não foi possível enviar o e-mail. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      
      <View style={stylesAcesso.loginHeader}>
        <Text style={stylesAcesso.loginTitle}>Recuperar Senha</Text>
        <Text style={stylesAcesso.loginSubtitle}>
          Insira o e-mail cadastrado e enviaremos um link para você criar uma nova senha.
        </Text>
      </View>

      <View style={stylesAcesso.formContainer}>
        
        <Text style={stylesAcesso.inputLabel}>E-mail de Cadastro</Text>
        <TextInput
          style={stylesAcesso.input}
          placeholder="exemplo@email.com"
          placeholderTextColor="#94a3b8"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />

        <TouchableOpacity 
          style={[globalStyles.buttonPrimary, { marginTop: 12 }, loading && { opacity: 0.7 }]} 
          activeOpacity={0.8}
          onPress={handleResetPassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={globalStyles.buttonPrimaryText}>Enviar Link de Recuperação</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[globalStyles.buttonSecondary, { marginTop: 12 }]} 
          onPress={() => router.back()}
          disabled={loading}
        >
          <Text style={globalStyles.buttonSecondaryText}>Cancelar e Voltar</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}