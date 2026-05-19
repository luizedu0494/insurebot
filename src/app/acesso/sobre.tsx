import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import globalStyles from '../../styles/global';   
import stylesAcesso from '../../styles/acesso';   
import { router } from 'expo-router';

export default function Sobre() {
  return (
    <ScrollView 
      contentContainerStyle={[globalStyles.container, { paddingVertical: 40 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <Image source={require('../../assets/logo.png')} style={globalStyles.image} />
        <Text style={globalStyles.botTitle}>Sobre o App</Text>
      </View>

      <View style={{ width: '100%' }}>
        <Text style={stylesAcesso.aboutText}>
          O <Text style={{ fontFamily: 'sans-serif-medium' }}>InsureBot</Text> é uma plataforma inteligente desenvolvida para simplificar o universo dos seguros. Nosso objetivo é transformar termos complexos e apólices confusas em respostas diretas, rápidas e fáceis de entender.
        </Text>

        <Text style={stylesAcesso.aboutText}>
          Utilizando inteligência artificial, o assistente virtual está disponível 24 horas por dia para sanar dúvidas sobre coberturas residenciais, automotivas, de vida, além de guiar você sobre como proceder em casos de sinistros ou emergências.
        </Text>

        <Text style={stylesAcesso.aboutText}>
          Este projeto une tecnologia de ponta em desenvolvimento mobile com as melhores práticas de atendimento, garantindo total segurança, privacidade e confiabilidade nas informações prestadas.
        </Text>
      </View>

      <View style={[globalStyles.buttonContainer, { marginTop: 20 }]}>
        <TouchableOpacity style={globalStyles.buttonSecondary} activeOpacity={0.7} onPress={()=> router.back()} >
          <Text style={globalStyles.buttonSecondaryText}>Voltar ao Início</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}