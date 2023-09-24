import React, { useState } from 'react'
import { Alert, Text, SafeAreaView, StyleSheet, Image, View, Button, TextInput,  } from 'react-native';
import logoBlix from '../assets/logoborboleta.png'
import * as Notifications from 'expo-notifications';
import { sendPushNotification } from './notification/sendPushNotification';


export default function AdminScreen() {
  const [title, onChangeTitle] = useState('Titulo da notificação');
  const [text, onChangeText] = useState('Texto da notificação');
  const [link, onChangeLink] = useState('Link para redirecionar o usuário');

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true
    })
  })

  const handleNotification  = async () => {
    sendPushNotification(title, text, link)
  };

  return (
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
           Notificação para usuário
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeTitle}
            value={title}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeLink}
            value={link}
          />
          <Button color='#6A2597'  title='Enviar Notificação' onPress={handleNotification}/>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#E6E6FA'
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#FFFF',
    borderColor: 'transparent',
    borderRadius: 5,
  },
  button: {

  }
});
