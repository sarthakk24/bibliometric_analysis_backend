import { promisify } from 'util';
import $console from 'colorful-console-log';

import database from '../../loaders/database';
import Logger from '../../loaders/logger';
import mailerService from '../../utils/mailer';
import { readCSV } from '../../utils/csv/csv';

const sleep = promisify(setTimeout);

export async function sendMail(data: any) {
  try {
    await mailerService(data.template, data.subject, data, data.email);
    return {
      status: 200,
      response: {
        success: true,
        message: `email sent to  ${data.email}`,
      },
    };
  } catch (err: any) {
    Logger.error(err.error);
    return {
      status: err.code || 409,
      response: { success: false, message: err.error || 'ISR' },
    };
  }
}

export async function sendMassMail(data: any) {
  try {
    const db = await database();
    const collection = db.collection(data.collection);
    const mails = await collection.find({}).toArray();

    for (const email of mails) {
      await mailerService(data.template, data.subject, '', email.email);
      await sleep(1000);
      console.log(`mail sent to ${email.email}`);
    }

    return {
      status: 200,
      response: {
        success: true,
        message: `email sent to  ${data.email}`,
      },
    };
  } catch (err: any) {
    Logger.error(err.error);
    return {
      status: err.code || 409,
      response: { success: false, message: err.error || 'ISR' },
    };
  }
}

export async function sendCsvMail(req: any) {
  try {
    const options = {
      delimiter: '\n',
      header: true,
    };

    const data = await readCSV(req.files.csv.data.toString(), options);
    if (!data) {
      return {
        status: 400,
        response: {
          success: false,
          message: 'csv file is empty',
        },
      };
    }

    if (req.body.message) {
      $console.orange(req.body.message);
    }
    for (const { _id, email } of data) {
      await sleep(250);
      $console.green(`mail sent to ${email} with ${_id}`);
    }

    return {
      status: 200,
      response: {
        success: true,
        data,
        message: `email sent `,
      },
    };
  } catch (err: any) {
    Logger.error(err.error);
    return {
      status: err.code || 409,
      response: { success: false, message: err.message || 'ISR' },
    };
  }
}
