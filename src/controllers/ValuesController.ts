import { Request, Response } from 'express';

class ValuesController {
  static getValue = async (req: Request, res: Response): Promise<void> => {
    res.send({
      a: 1,
      b: 2
    });
  };
}

export default ValuesController;
