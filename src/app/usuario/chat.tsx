import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import stylesUsuario from '../../styles/usuario'; 

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Eu sou o InsureBot, seu assistente de seguros. Como posso te ajudar hoje?',
      sender: 'bot',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loadingBot, setLoadingBot] = useState(false); 
  const flatListRef = useRef<FlatList>(null);
  const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;

  const handleSendMessage = async () => {
    if (!inputText.trim() || loadingBot) return;

    if (!GROQ_API_KEY) {
      Alert.alert("Erro interno", "Configuração de segurança ausente. Reinicie o servidor do app.");
      return;
    }

    const userText = inputText.trim();

    const userMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: 'user',
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);

    setLoadingBot(true);

    try {
      const apiMessages = updatedMessages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      apiMessages.unshift({
        role: 'system',
        content: 'Você é o InsureBot, um assistente virtual especializado em seguros. Seja prestativo, educado, fale em português do Brasil e tire dúvidas sobre apólices, sinistros e coberturas de forma simples.'
      });

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: apiMessages,
          temperature: 0.7,
        })
      });

      const data = await response.json();

      if (response.ok && data.choices?.[0]?.message?.content) {
        const botReplyText = data.choices[0].message.content;

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botReplyText,
          sender: 'bot',
        };

        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(data.error?.message || 'Erro na resposta da API');
      }

    } catch (error) {
      console.error(error);
      Alert.alert("Erro de conexão", "O InsureBot está temporariamente fora do ar. Tente novamente.");
    } finally {
      setLoadingBot(false);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <KeyboardAvoidingView
      style={stylesUsuario.chatContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={stylesUsuario.messageList}
        renderItem={({ item }) => (
          <View
            style={[
              stylesUsuario.balloon,
              item.sender === 'user' ? stylesUsuario.userBalloon : stylesUsuario.botBalloon,
            ]}
          >
            <Text style={item.sender === 'user' ? stylesUsuario.userText : stylesUsuario.botText}>
              {item.text}
            </Text>
          </View>
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {loadingBot && (
        <View style={[stylesUsuario.balloon, stylesUsuario.botBalloon, { marginLeft: 16, marginBottom: 8, paddingVertical: 8, width: 60 }]}>
          <ActivityIndicator size="small" color="#0284c7" />
        </View>
      )}

      <View style={stylesUsuario.inputContainer}>
        <TextInput
          style={stylesUsuario.chatInput}
          placeholder="Digite sua dúvida sobre seguros..."
          placeholderTextColor="#94a3b8"
          value={inputText}
          onChangeText={setInputText}
          multiline={true}
          editable={!loadingBot}
        />
        
        <TouchableOpacity
          style={[stylesUsuario.sendButton, loadingBot && { opacity: 0.5 }]}
          activeOpacity={0.8}
          onPress={handleSendMessage}
          disabled={loadingBot}
        >
          <Ionicons name="send" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}