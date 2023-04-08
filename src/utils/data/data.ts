import axios from 'axios';
import { readCSV } from '../csv/csv';

export const getData = async (vidwanId: string) => {
  try {
    const response = await axios.get(
      `https://srmist.irins.org/assets/files/coauthor_${vidwanId}.csv`
    );

    const parsedData = await readCSV(response, {
      delimiter: '\n',
      header: true,
    });

    return parsedData;
  } catch (error) {
    return error;
  }
};
