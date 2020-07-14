import { Notification_Subscribers } from '../entity/Notification_Subscribers';
import { getRepository, getConnection, DeleteResult } from 'typeorm';

const read = async (): Promise<Notification_Subscribers[]> => {
  return await getRepository(Notification_Subscribers)
    .createQueryBuilder('sub')
    .select()
    .getMany();
};

const findByAgentId = async (
  agentId: string
): Promise<Notification_Subscribers[]> => {
  return await getRepository(Notification_Subscribers)
    .createQueryBuilder('sub')
    .select()
    .where('sub.agentId = :agentId', { agentId })
    .getMany();
};

const remove = async (id: number): Promise<DeleteResult> => {
  return await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Notification_Subscribers)
    .where('ID = :id', { id })
    .execute();
};

export default {
  read,
  findByAgentId,
  remove
};
