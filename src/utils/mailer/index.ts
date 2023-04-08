import { promises as fs } from 'fs';
import { join } from 'path';
import Logger from '../../loaders/logger';
import { createNodemailerMail, sendEmail } from './awsService';
import { getTemplatedString } from './templateService';

interface attachmentsArgs {
  filename: string;
  path: string;
  cid?: string;
}

const mailerService = async (
  template: string,
  subject: string,
  data: any,
  email: any,
  attachments?: attachmentsArgs[]
) => {
  const path = `/public/template/${template}.html`;
  let htmlBuffer = await fs.readFile(join(__dirname, '/../../../', path));
  let mail = createNodemailerMail(
    getTemplatedString(data, htmlBuffer.toString()),
    '',
    subject,
    email,
    attachments
  );

  try {
    await sendEmail(mail);
  } catch (err) {
    Logger.error(err || 'Error sending SES email');
    throw err;
  }
};

export default mailerService;
