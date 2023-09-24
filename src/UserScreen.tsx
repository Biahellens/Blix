import React, { useEffect } from 'react';
import { View, Text, Button, SafeAreaView, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Linking } from 'react-native';
import { sendPushNotificationDefault } from './notification/sendPushNotification'
import logoBlix from '../assets/logoborboleta.png'

export default function UserScreen() {
  const navigation = useNavigation();
  const toAdmin = () => {
    navigation.navigate('Admin');
  }

  sendPushNotificationDefault()

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
          <Button title='Mudar para Admin' color='#00FFFF' onPress={toAdmin}/>
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