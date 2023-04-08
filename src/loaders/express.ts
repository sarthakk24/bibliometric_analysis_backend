import cors from 'cors';
import express from 'express';
import config from '../config';
import routes from '../api';
import fileUpload from 'express-fileupload';

export default ({ app }: { app: express.Application }): void => {
  app.get('/healthCheck', (req, res) => {
    const healthCheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    };
    try {
      return res.json(healthCheck);
    } catch (e) {
      return res.status(503).send();
    }
  });

  const upOpt = {
    limits: { fileSize: 10 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: 'File Size Limit exceeded',
    // debug: true,
    parseNested: true,
    // useTempFiles: true,
    // tempFileDir: os.tmpdir(),
    preserveExtension: 4,
  };

  app.use(fileUpload(upOpt));
  app.use('/public', express.static(__dirname + '/../../public'));
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(config.api.prefix, routes());
};
