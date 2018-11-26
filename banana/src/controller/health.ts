import { Response, Request } from 'express';

export let getHealth = (req: Request, res: Response) => {
  res.json({
    status: 'UP'
  });
};

export let getDatastore = (req: Request, res: Response) => {
  res.json({
    status: 'UP'
  });
};
