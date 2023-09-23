import React, { useEffect } from 'react';
import { View, Text, Button, SafeAreaView, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { LinearGradient } from 'expo-linear-gradient';
import logoBlix from '../assets/logoborboleta.png'
import * as Permissions from 'expo-permissions';
import * as Linking from 'expo-linking';


export default function UserScreen() {
  const navigation = useNavigation();
  //navigation.navigate('Admin');


  useEffect( () => {
    async function permissionsNotify () {

      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );

      let statusPermission = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await
           Permissions.askAsync(Permissions.NOTIFICATIONS);

           statusPermission = status;
      }

      if (statusPermission !== 'granted') {
        return;
      }

      const projectId = 'd1a4c195-a709-4266-a0a4-5fa32559e3d3';
      let token = await Notifications.getExpoPushTokenAsync({projectId});
      console.log( token );
    }
    permissionsNotify();
  },[])

  const sendPushNotification = async () => {
    const url = Linking.openURL('https://www.instagram.com/blix.aplicativos/');
    try {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'ExponentPushToken[b_ED8hEL0NBwY3M_9NUtQO]',
          title: 'oi',
          body: 'bia',
          data: { customUrl: url },
        }),
      });

      if (response.status === 200) {
        console.log('Notificação push enviada com sucesso!');
      } else {
        console.error('Erro ao enviar notificação push:', response.status);
      }
    } catch (error) {
      console.error('Erro ao enviar notificação push:', error);
    }
  };

  sendPushNotification();

  return (
    <LinearGradient
      style={{
        height: '100%',
        width: '100%',
      }}
      colors={['#E6E6FA','#6A2597']}
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