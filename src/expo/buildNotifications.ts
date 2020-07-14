import { ExpoPushToken, ExpoPushMessage } from 'expo-server-sdk';

const buildNotifications = (
  tokens: ExpoPushToken[],
  message: {
    title: string;
    body: string;
    data: {
      [key: string]: unknown;
    };
  }
): ExpoPushMessage[] => {
  const notifications: ExpoPushMessage[] = tokens.map(token => ({
    to: token,
    title: message.title,
    body: message.body,
    data: message.data
  }));
  return notifications;
};

export default buildNotifications;
