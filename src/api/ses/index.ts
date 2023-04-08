import { NextFunction, Request, Response, Router } from 'express';
import Logger from '../../loaders/logger';
import { sendCsvMail, sendMail, sendMassMail } from './controller';

const sesRouter = Router();

sesRouter.get('/', handleCheck);
sesRouter.post('/single', handleEmail);
sesRouter.post('/mass', handleMassMail);
sesRouter.post('/csv', handleCsvMail);

async function handleCheck(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json('ses is working');
  } catch (err: any) {
    Logger.error(err.error);
    res
      .status(err.code || 503)
      .json({ success: false, message: err.error || 'ISR' });
  }
}

async function handleEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const message = await sendMail(req.body);
    res.status(message.status || 503).json(message.response || 'ISR');
  } catch (err: any) {
    Logger.error(err.error);
    res
      .status(err.code || 503)
      .json({ success: false, message: err.error || 'ISR' });
  }
}

async function handleMassMail(req: Request, res: Response, next: NextFunction) {
  try {
    const message = await sendMassMail(req.body);
    res.status(message.status || 503).json(message.response || 'ISR');
  } catch (err: any) {
    Logger.error(err.error);
    res
      .status(err.code || 503)
      .json({ success: false, message: err.error || 'ISR' });
  }
}

async function handleCsvMail(req: Request, res: Response, next: NextFunction) {
  try {
    const message = await sendCsvMail(req);
    res.status(message.status || 503).json(message.response || 'ISR');
  } catch (err: any) {
    Logger.error(err.error);
    res
      .status(err.code || 503)
      .json({ success: false, message: err.error || 'ISR' });
  }
}

export default sesRouter;
