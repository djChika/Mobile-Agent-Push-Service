import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';

const sendNotifications = async (
  expo: Expo,
  notifications: ExpoPushMessage[]
): Promise<ExpoPushTicket[]> => {
  const chunks = expo.chunkPushNotifications(notifications);

  const tickets = [];

  for (const chunk of chunks) {
    const results = await expo.sendPushNotificationsAsync(chunk);

    tickets.push(
      ...results.map((result, index) => ({
        ...result,
        token: chunk[index].to
      }))
    );
  }

  return tickets;
};

export default sendNotifications;
