import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, SafeAreaView, StyleSheet, Image, View } from 'react-native';

import logoBlix from '../assets/logoborboleta.png'

export default function App() {
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
