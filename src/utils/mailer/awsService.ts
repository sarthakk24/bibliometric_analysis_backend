import aws from 'aws-sdk';
import nodemailer from 'nodemailer';
import config from '../../config';

const ses = new aws.SES({
  apiVersion: '2019-09-27',
  region: config.region,
  credentials: new aws.Credentials({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  }),
});

export const sendEmail = async (mail: any) => {
  let transporter = nodemailer.createTransport({
    SES: { ses, aws },
  });

  let request = transporter.sendMail(mail);
  return request;
};

export const createNodemailerMail = (
  html: any,
  text: string,
  subject: string,
  receiverEmail: string,
  attachments?: any // attachments as an optional parameter
) => {
  const mail = attachments
    ? {
        from: config.from,
        to: receiverEmail,
        replyTo: config.replyTo,
        subject,
        text,
        html,
        attachments,
      }
    : {
        from: config.from,
        to: receiverEmail,
        replyTo: config.replyTo,
        subject,
        text,
        html,
      };
  return mail;
};
