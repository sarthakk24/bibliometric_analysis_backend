import axios from 'axios';
import { readCSV } from '../csv/csv';

export const GetData = async (vidwanId: string) => {
  try {
    const csvResponse = await axios.get(
      `https://srmist.irins.org/assets/files/coauthor_${vidwanId}.csv`
    );
    const parsedData = await readCSV(csvResponse.data, {
      delimiter: '\n',
      header: true,
    });

    // const infoResponse = await axios.post(
    //   `https://srmist.irins.org/profile/get_sidebarData`,
    //   {
    //     expert_id: vidwanId,
    //     organisation: 'SRM Institute of Science and Technology',
    //     expertise: 'Computer Science Artificial Intelligence',
    //     institute_id: '11353',
    //     department: 'Department of Networking and Communications - KTR',
    //     org_type: 'Deemed University',
    //   }
    // );

    // console.log(infoResponse.data);

    return parsedData;
  } catch (error) {
    return error;
  }
};
