import { LinearGradient } from 'expo-linear-gradient';
import { Alert, Text, SafeAreaView, StyleSheet, Image, View, Button } from 'react-native';
import logoBlix from '../assets/logoborboleta.png'
import * as Notifications from 'expo-notifications';
import React, { useState } from 'react'

export default function App() {    
  const [notificationSent, setNotificationSent] = useState(false)

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true
    })
  })

  const handleNotification  = async () => {
    try {
      const projectId = 'd1a4c195-a709-4266-a0a4-5fa32559e3d3';
      const { data: token } = await Notifications.getExpoPushTokenAsync({ projectId });
      
      // Enviar a notificação para o token
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: token,
          title: 'Nova Notificação',
          body: 'Olá, esta é uma notificação de exemplo!',
        }),
      });

      setNotificationSent(true);
      //alert('Notificação enviada com sucesso!');

    } catch (error) {
      console.error('Erro ao obter o token ou agendar notificação:', error);
    }
  };  


  return (
    <LinearGradient 
      style={{
        height: '100%', 
        width: '100%', 
      }}
      colors={['#A62A5C','#6A2597']}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.imageTop}>
          <Image 
            style={styles.tinyLogo}
            source={logoBlix}
          />
        </View>

          <Text style={styles.h2}> 
            BLIX, parceira tecnológica perfeita para sua startup
          </Text>
          <Text style={styles.paragraph}>
            Não importa quão pequena ou grande seja uma startup e quão grandes sejam suas ambições, a Blix está aqui para ajudá-los a entrar no 
            mercado e alcançar seu merecido sucesso.
          </Text>
          {notificationSent === true ? (
            <Text style={styles.paragraph}>oi</Text>
          ) : (
            <Text>oi</Text>
          )}
          <Button title='Clique Para Saber mais' onPress={handleNotification}/>
      </SafeAreaView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  paragraph: {
    margin: 14,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFFFFF'
  },
  h2: {
    margin: 12,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#DDA0DD'
  },
  imageTop: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 80,
    height: 80,
  },
});


