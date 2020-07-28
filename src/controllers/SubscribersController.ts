import { sendPushNotification } from './../expo';
import { Notification_Subscribers } from '../entity/Notification_Subscribers';
import { Request, Response } from 'express';
import SubscribersRepository from '../repository/Subscribers';
import NotificationsRepository from '../repository/Notifications';

class SubscribersController {
  static push = async (req: Request, res: Response): Promise<Response> => {
    const { agentId, title, body, data } = req.body;
    if (!title || !body || !agentId) {
      return res.status(400).send({
        error: 'AgentId, title or body missed.'
      });
    }

    if (!data.target) {
      return res.status(400).send({
        error: 'missing target in data'
      });
    }

    const subscribers = (await SubscribersRepository.findByAgentId(
      agentId
    )) as Notification_Subscribers[];

    return NotificationsRepository.write(
      [agentId],
      data.target,
      JSON.stringify(data),
      title,
      body
    )
      .then(() => {
        return sendPushNotification(subscribers, {
          title,
          body,
          data
        })
          .then(({ shippingErrors, usersNotRegistered }) => {
            return res.json({ shippingErrors, usersNotRegistered });
          })
          .catch(error => {
            console.log('SubscribersController -> error', error);
            return res.status(500).send(error);
          });
      })
      .catch(err => {
        return res.status(500).send(err);
      });
  };

  static pushAll = async (req: Request, res: Response): Promise<Response> => {
    const { title, body, data } = req.body;
    if (!title || !body) {
      return res.status(400).send({
        error: 'title or body missed.'
      });
    }

    if (!data.target) {
      return res.status(400).send({
        error: 'missing target in data'
      });
    }

    const subscribers = (await SubscribersRepository.read()) as Notification_Subscribers[];
    const agentIds = subscribers.map(x => x.AgentId);

    return NotificationsRepository.write(
      agentIds,
      data.target,
      JSON.stringify(data),
      title,
      body
    )
      .then(() => {
        return sendPushNotification(subscribers, {
          title,
          body,
          data
        })
          .then(({ shippingErrors, usersNotRegistered }) => {
            return res.json({ shippingErrors, usersNotRegistered });
          })
          .catch(error => {
            console.log('SubscribersController -> error', error);
            return res.status(500).send(error);
          });
      })
      .catch(err => {
        return res.status(500).send(err);
      });
  };
}

export default SubscribersController;
