import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase'; 
import { router } from 'expo-router';
import globalStyles from '../../styles/global';   
import stylesAcesso from '../../styles/acesso';   

export default function Logar() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace('/usuario/chat');
    } catch (error: any) {
      console.log(error);
      if (
        error.code === 'auth/invalid-credential' || 
        error.code === 'auth/user-not-found' || 
        error.code === 'auth/wrong-password'
      ) {
        Alert.alert("Erro", "E-mail ou senha incorretos.");
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert("Erro", "O formato do e-mail digitado é inválido.");
      } else {
        Alert.alert("Erro", "Não foi possível fazer login. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      
      <View style={stylesAcesso.loginHeader}>
        <Text style={stylesAcesso.loginTitle}>Acesse sua conta</Text>
        <Text style={stylesAcesso.loginSubtitle}>Bem-vindo de volta ao InsureBot!</Text>
      </View>

      <View style={stylesAcesso.formContainer}>
        
        <Text style={stylesAcesso.inputLabel}>E-mail</Text>
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

        <Text style={stylesAcesso.inputLabel}>Senha</Text>
        <TextInput
          style={stylesAcesso.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#94a3b8"
          secureTextEntry={true}
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        <TouchableOpacity 
          style={{ alignSelf: 'flex-end', marginBottom: 20, marginTop: -4 }}
          onPress={() => router.push('/acesso/recuperar')}
          disabled={loading}
        >
          <Text style={{ color: '#0284c7', fontSize: 14, fontFamily: 'sans-serif-medium' }}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[globalStyles.buttonPrimary, loading && { opacity: 0.7 }]} 
          activeOpacity={0.8}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={globalStyles.buttonPrimaryText}>Entrar</Text>
          )}
        </TouchableOpacity>

      </View>

    </View>
  );
}