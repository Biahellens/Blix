import React, { useEffect } from 'react';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export async function getPermission () {
  useEffect(() => {
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

      // projectid do expo
      const projectId = 'd1a4c195-a709-4266-a0a4-5fa32559e3d3';
      let token = await Notifications.getExpoPushTokenAsync({projectId});
      console.log( token );
      return token
    }
    permissionsNotify();
  }, [])
}

export async function sendPushNotification ( title: string, body: string, url: string) {
  // Redireciona para a url desejada
  const customUrl = Linking.openURL(url);

  // Envia a notificação
  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: getPermission,
        title: title,
        body: body,
        data: { customUrl: customUrl },
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

export async function sendPushNotificationDefault() {
  const title = 'Notificação';
  const text = 'Vem conhecer mais do nosso produto';
  const link = 'https://www.instagram.com/blix.aplicativos/'

  sendPushNotification(title,text,link)
}