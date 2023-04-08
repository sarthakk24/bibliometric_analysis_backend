import { NextFunction, Request, Response, Router } from 'express';
import Logger from '../../loaders/logger';
import { addData } from './controller';

const incomingRouter = Router();

incomingRouter.post('/new', handleNewDataUpload);
incomingRouter.get('/', handleCheck);

async function handleCheck(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json('Fetch Route is working');
  } catch (err: any) {
    Logger.error(err.error);
    res
      .status(err.code || 503)
      .json({ success: false, message: err.error || 'ISR' });
  }
}

async function handleNewDataUpload(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { vidwanId, year } = req.body;
    const data = await addData(vidwanId, year);
    console.log(data);

    res.status(200).json('new uploaded successfully');
  } catch (err: any) {
    Logger.error(err.error);
    res
      .status(err.code || 503)
      .json({ success: false, message: err.error || 'ISR' });
  }
}

export default incomingRouter;
