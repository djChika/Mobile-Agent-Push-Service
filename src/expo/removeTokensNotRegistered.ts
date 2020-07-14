import { Notification_Subscribers } from '../entity/Notification_Subscribers';
import SubscribersRepository from './../repository/Subscribers';
const removeTokensNotRegistered = async (
  tokensNotRegistered: string[],
  subscribers: Notification_Subscribers[]
): Promise<void[]> => {
  const subscribersToRemove = subscribers.filter(sub =>
    tokensNotRegistered.includes(sub.Push_Token)
  );
  return Promise.all(
    subscribersToRemove.map(async ({ ID }) => {
      SubscribersRepository.remove(ID);
    })
  );
};

export default removeTokensNotRegistered;
