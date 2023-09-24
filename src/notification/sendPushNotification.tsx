import React, { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Linking } from 'react-native';

export async function getPermission() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );

  let statusPermission = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    statusPermission = status;
  }

  if (statusPermission !== 'granted') {
    return null;
  }

  // projectid do expo
  const projectId = 'd1a4c195-a709-4266-a0a4-5fa32559e3d3';
  const { data: token } = await Notifications.getExpoPushTokenAsync({ projectId });
  return token;
}

export async function sendPushNotification ( title: string, body: string, customUrl: string) {
  try {
    // Verifica se possui permissão para enviar notificação
    const token = await getPermission();
    console.log(token);

    if (!token) {
      console.error('Permissão não concedida para notificações.');
      return;
    }

    // Envia a notificação
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: token,
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

    // Redireciona para o link indicado
    Linking.openURL(customUrl);

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