import { Notification_Subscribers } from '../entity/Notification_Subscribers';
export interface Notification {
  android: {
    vibrate: number[];
  };
  channelId: string;
  sound: string;
  title: string;
  body: string;
  to: string;
}

export interface Ticket {
  message: string;
  status: string;
  token: string;
  id: string;
  details?: {
    error?:
      | 'InvalidCredentials'
      | 'MessageTooBig'
      | 'MessageRateExceeded'
      | 'DeviceNotRegistered'
      | undefined;
  };
}

export type PushResultError = {
  message: string;
  token: string;
};

export type ExpoPushResult = {
  ticketsWithErrors: PushResultError[];
  ticketsNotRegistered: string[];
};

export type ShippingError = {
  user: Notification_Subscribers | undefined;
  reason: string;
};
