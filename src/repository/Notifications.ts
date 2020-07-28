import { getRepository } from 'typeorm';
import { Notifications } from '../entity/Notifications';

const write = async (
  agentIds: string[],
  target: string,
  data: string,
  title: string,
  body: string
): Promise<void> => {
  await getRepository(Notifications).save([
    ...agentIds.map(agentId => ({
      AgentId: agentId,
      Target: target,
      Data: data,
      Title: title,
      Body: body,
      isRead: false
    }))
  ]);
};

export default {
  write
};
