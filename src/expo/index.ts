import { Expo } from 'expo-server-sdk';
import { Notification_Subscribers } from './../entity/Notification_Subscribers';
import { ShippingError } from './../types/index';
import buildNotifications from './buildNotifications';
import getErrorsFromProviders from './getErrorsFromProviders';
import getPushResultsFromExpo from './getPushResultsFromExpo';
import getPushResultsFromProviders from './getPushResultsFromProviders';
import getValidTokens from './getValidTokens';
import removeTokensNotRegistered from './removeTokensNotRegistered';
import sendNotifications from './sendNotifications';

const expo = new Expo();

export const sendPushNotification = async (
  subscribers: Notification_Subscribers[],
  message: {
    title: string;
    body: string;
    data: {
      [key: string]: unknown;
    };
  }
): Promise<unknown> => {
  const tokens = subscribers.map(x => x.Push_Token);
  const validTokens = getValidTokens(tokens);
  const notifications = buildNotifications(validTokens, message);
  const tickets = await sendNotifications(expo, notifications);

  const resultsFromExpo = getPushResultsFromExpo(tickets);
  const resultsFromProvider = await getPushResultsFromProviders(
    expo,
    resultsFromExpo.validTickets
  );
  const errorsFromProvider = getErrorsFromProviders(resultsFromProvider);

  const ticketsNotRegistered = [
    ...resultsFromExpo.ticketsNotRegistered,
    ...errorsFromProvider.ticketsNotRegistered
  ];
  const ticketsWithErrors = [
    ...resultsFromExpo.ticketsWithErrors,
    ...errorsFromProvider.ticketsWithErrors
  ];

  let shippingErrors: ShippingError[] = [];
  let usersNotRegistered: Notification_Subscribers[] = [];

  if (ticketsWithErrors.length) {
    shippingErrors = ticketsWithErrors.map(({ message, token }) => {
      const user = subscribers.find(({ Push_Token }) => Push_Token === token);
      return {
        reason: message,
        user
      };
    });
  }

  if (ticketsNotRegistered.length) {
    usersNotRegistered = subscribers.filter(({ Push_Token }) =>
      ticketsNotRegistered.includes(Push_Token)
    );
    await removeTokensNotRegistered(ticketsNotRegistered, subscribers);
  }

  return {
    shippingErrors,
    usersNotRegistered
  };
};
