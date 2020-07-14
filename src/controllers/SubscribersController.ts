import { sendPushNotification } from './../expo';
import { Notification_Subscribers } from '../entity/Notification_Subscribers';
import { Request, Response } from 'express';
import SubscribersRepository from './../repository/Subscribers';

class SubscribersController {
  static push = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { agentId, title, body, data } = req.body;
      if (!title || !body || !agentId) {
        return res.status(400).send({
          error: 'AgentId, title or body missed.'
        });
      }

      const subscribers = (await SubscribersRepository.findByAgentId(
        agentId
      )) as Notification_Subscribers[];

      const { shippingErrors, usersNotRegistered } = await sendPushNotification(
        subscribers,
        {
          title,
          body,
          data
        }
      );

      return res.json({ shippingErrors, usersNotRegistered });
    } catch (error) {
      return res.sendStatus(500).send(error);
    }
  };

  static pushAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { title, body, data } = req.body;
      if (!title || !body) {
        return res.status(400).send({
          error: 'title or body missed.'
        });
      }

      const subscribers = (await SubscribersRepository.read()) as Notification_Subscribers[];

      const { shippingErrors, usersNotRegistered } = await sendPushNotification(
        subscribers,
        {
          title,
          body,
          data
        }
      );

      return res.json({ shippingErrors, usersNotRegistered });
    } catch (error) {
      return res.sendStatus(500).send(error);
    }
  };
}

export default SubscribersController;
