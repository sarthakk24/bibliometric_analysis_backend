import { NextFunction, Request, Response, Router } from 'express';
import Logger from '../../loaders/logger';

const s3Router = Router();

s3Router.post('/single-upload', handleSingleUpload);
s3Router.post('/multiple-upload', handleMultipleUpload);
s3Router.get('/get-files', handleGetFiles);
s3Router.get('/', handleCheck);

async function handleCheck(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json('S3 is working');
  } catch (err: any) {
    Logger.error(err.error);
    res
      .status(err.code || 503)
      .json({ success: false, message: err.error || 'ISR' });
  }
}

async function handleGetFiles(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json('File uploaded successfully');
  } catch (err: any) {
    Logger.error(err.error);
    res
      .status(err.code || 503)
      .json({ success: false, message: err.error || 'ISR' });
  }
}

async function handleSingleUpload(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.status(200).json('File uploaded successfully');
  } catch (err: any) {
    Logger.error(err.error);
    res
      .status(err.code || 503)
      .json({ success: false, message: err.error || 'ISR' });
  }
}

async function handleMultipleUpload(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.status(200).json('Multiple Files uploaded successfully');
  } catch (err: any) {
    Logger.error(err.error);
    res
      .status(err.code || 503)
      .json({ success: false, message: err.error || 'ISR' });
  }
}

export default s3Router;
