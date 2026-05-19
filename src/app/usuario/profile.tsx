import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, Image } from 'react-native';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker'; 
import globalStyles from '../../styles/global';
import stylesUsuario from '../../styles/usuario';

interface UserData {
  nome: string;
  email: string;
  fotoUrl?: string; 
}

interface Apolice {
  id: string;
  numero: string;
  tipo: string;
  status: string;
  premio: string;
  validade: string;
}

export default function Perfil() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [apolices, setApolices] = useState<Apolice[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState<string | null>(null); 

  const usuarioLogado = auth.currentUser;

  useEffect(() => {
    const carregarDadosPerfil = async () => {
      if (!usuarioLogado) {
        setLoading(false);
        return;
      }

      try {
        const usuarioRef = doc(db, 'usuarios', usuarioLogado.uid);
        const usuarioSnap = await getDoc(usuarioRef);

        if (usuarioSnap.exists()) {
          const dados = usuarioSnap.data() as UserData;
          setUserData(dados);
          if (dados.fotoUrl) {
            setImageUri(dados.fotoUrl);
          }
        }

        const apolicesRef = collection(db, 'usuarios', usuarioLogado.uid, 'apolices');
        const querySnapshot = await getDocs(apolicesRef);
        
        const listaApolices: Apolice[] = [];
        querySnapshot.forEach((documento) => {
          listaApolices.push({
            id: documento.id,
            ...(documento.data() as Omit<Apolice, 'id'>),
          });
        });

        setApolices(listaApolices);

      } catch (error) {
        console.error("Erro ao carregar dados do Firestore:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do seu perfil.");
      } finally {
        setLoading(false);
      }
    };

    carregarDadosPerfil();
  }, [usuarioLogado]);

  const escolherDaGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert("Permissão necessária", "Precisamos de acesso às suas fotos para alterar a foto de perfil.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], 
      allowsEditing: true,    
      aspect: [1, 1],         
      quality: 0.5,           
    });

    if (!resultado.canceled && resultado.assets[0].uri) {
      salvarFotoPerfil(resultado.assets[0].uri);
    }
  };

  const tirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert("Permissão necessária", "Precisamos de acesso à câmera para tirar sua foto de perfil.");
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!resultado.canceled && resultado.assets[0].uri) {
      salvarFotoPerfil(resultado.assets[0].uri);
    }
  };

  const salvarFotoPerfil = async (uri: string) => {
    setImageUri(uri);
    
    if (usuarioLogado) {
      try {
        const usuarioRef = doc(db, 'usuarios', usuarioLogado.uid);
        await updateDoc(usuarioRef, { fotoUrl: uri });
        console.log("Caminho da foto aktualizado no Firestore!");
      } catch (error) {
        console.error("Erro ao salvar link da foto no banco:", error);
      }
    }
  };

  const handleSelecionarImagem = () => {
    Alert.alert(
      "Foto de Perfil",
      "Escolha de onde deseja selecionar a sua foto:",
      [
        { text: "Tirar Foto (Câmera)", onPress: tirarFoto },
        { text: "Escolher da Galeria", onPress: escolherDaGaleria },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.replace('/acesso/login');
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair da conta.");
    }
  };

  if (loading) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0284c7" />
        <Text style={{ marginTop: 12, color: '#64748b' }}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      
      <View style={{ alignItems: 'center', marginVertical: 24, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' }}>
        
        <TouchableOpacity 
          activeOpacity={0.7} 
          onPress={handleSelecionarImagem}
          style={{ 
            width: 100, 
            height: 100, 
            borderRadius: 50, 
            backgroundColor: '#e0f2fe', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginBottom: 12, 
            overflow: 'hidden', 
            borderColor: '#0284c7', 
            borderWidth: imageUri ? 2 : 0,
            position: 'relative', 
          }}
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} />
          ) : (
            <Ionicons name="person" size={50} color="#0284c7" />
          )}
          
          <View style={{ 
            position: 'absolute', 
            bottom: 0, 
            width: '100%', 
            backgroundColor: 'rgba(2, 132, 199, 0.85)', 
            paddingVertical: 4, 
            alignItems: 'center',
            pointerEvents: 'none' 
          }}>
            <Ionicons name="camera" size={14} color="#ffffff" />
          </View>
        </TouchableOpacity>

        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#1e293b' }}>
          {userData?.nome || 'Usuário'}
        </Text>
        <Text style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>
          {userData?.email || usuarioLogado?.email}
        </Text>
      </View>

      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 12, paddingHorizontal: 4 }}>
        Minhas Apólices
      </Text>

      <FlatList
        data={apolices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: '#ffffff', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0', elevation: 2 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#0284c7' }}>{item.tipo}</Text>
              <View style={{ backgroundColor: item.status === 'Ativo' ? '#dcfce7' : '#fee2e2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: item.status === 'Ativo' ? '#15803d' : '#b91c1c' }}>{item.status}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 14, color: '#475569', marginBottom: 2 }}>Nº: <Text style={{ fontWeight: '500' }}>{item.numero}</Text></Text>
            <Text style={{ fontSize: 14, color: '#475569', marginBottom: 2 }}>Prêmio: <Text style={{ fontWeight: '500' }}>{item.premio}</Text></Text>
            <Text style={{ fontSize: 14, color: '#475569' }}>Validade: <Text style={{ fontWeight: '500' }}>{item.validade}</Text></Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ color: '#94a3b8' }}>Você ainda não possui apólices registradas.</Text>
          </View>
        )}
      />

      <TouchableOpacity 
        style={[globalStyles.buttonSecondary, { marginTop: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, borderColor: '#ef4444' }]}
        activeOpacity={0.8}
        onPress={handleSignOut}
      >
        <Ionicons name="log-out-outline" size={20} color="#ef4444" />
        <Text style={[globalStyles.buttonSecondaryText, { color: '#ef4444' }]}>Sair da Conta</Text>
      </TouchableOpacity>

    </View>
  );
}