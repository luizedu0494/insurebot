import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase'; 
import { salvarDadosUsuario, criarApoliceTeste } from '../../services/firestoreService'; // Importando nossos serviços do Firestore
import { router } from 'expo-router';
import globalStyles from '../../styles/global';   
import stylesAcesso from '../../styles/acesso';   

export default function Cadastrar() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
   
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      await salvarDadosUsuario(user.uid, name.trim(), email.trim());

      await criarApoliceTeste(user.uid);
      
      Alert.alert("Sucesso!", "Sua conta foi criada com sucesso.", [
        { text: "OK", onPress: () => router.replace('/usuario/chat') }
      ]);
    } catch (error: any) {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert("Erro", "Este e-mail já está cadastrado.");
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert("Erro", "O e-mail digitado é inválido.");
      } else {
        Alert.alert("Erro", "Não foi possível criar a conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={[globalStyles.container, { paddingVertical: 40 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={stylesAcesso.loginHeader}>
        <Text style={stylesAcesso.loginTitle}>Crie sua conta</Text>
        <Text style={stylesAcesso.loginSubtitle}>Cadastre-se para começar a usar o InsureBot</Text>
      </View>

      <View style={stylesAcesso.formContainer}>
        <Text style={stylesAcesso.inputLabel}>Nome Completo</Text>
        <TextInput
          style={stylesAcesso.input}
          placeholder="Seu nome"
          placeholderTextColor="#94a3b8"
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
          editable={!loading}
        />

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
          placeholder="Crie uma senha segura"
          placeholderTextColor="#94a3b8"
          secureTextEntry={true}
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        <Text style={stylesAcesso.inputLabel}>Confirmar Senha</Text>
        <TextInput
          style={stylesAcesso.input}
          placeholder="Repita a senha criada"
          placeholderTextColor="#94a3b8"
          secureTextEntry={true}
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          editable={!loading}
        />

        <TouchableOpacity 
          style={[globalStyles.buttonPrimary, { marginTop: 12 }, loading && { opacity: 0.7 }]} 
          activeOpacity={0.8}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={globalStyles.buttonPrimaryText}>Criar Conta</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}