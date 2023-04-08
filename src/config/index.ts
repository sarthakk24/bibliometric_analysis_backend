require('dotenv').config();

export default {
  port: parseInt(process.env.PORT) || 4000,
  enviroment: process.env.ENVIROMENT || 'prod',
  databaseURL: process.env.MONGODB_URI,
  secret: process.env.SECRET,
  captchaKey: process.env.RECAPTCHA_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  region: process.env.AWS_REGION || 'ap-south-1',
  from: process.env.FROM_EMAIL,
  replyTo: process.env.REPLY_EMAIL,
  backendUrl: process.env.BACKEND_URL,
  frontendUrl: process.env.FRONTEND_URL,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api',
  },
};

