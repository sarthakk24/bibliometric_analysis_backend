import Papa from 'papaparse';

export const readCSV = async (file: any, options: any) => {
  try {
    const data = await Papa.parse(file, options);

    return data.data;
  } catch (error: any) {
    return error;
  }
};
