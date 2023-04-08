import { GetData } from '../../utils/data/data';

const getNodes = (structuredData: any) => {
  try {
    const uniqueImporters = new Set();
    structuredData.forEach((obj: any) => {
      uniqueImporters.add(obj.importer1);
      uniqueImporters.add(obj.importer2);
    });

    const nodes = [...uniqueImporters].map((importer, i) => ({
      id: i + 1,
      label: importer,
    }));

    return nodes;
  } catch (error: any) {
    return error;
  }
};

const getEdges = (structuredData: any, nodes: any) => {
  const edges = structuredData.map((obj: any) => {
    return {
      from: nodes.findIndex((node: any) => node.label === obj.importer1) + 1,
      to: nodes.findIndex((node: any) => node.label === obj.importer2) + 1,
    };
  });

  return edges;
};

export const addData = async (vidwanId: any, year: string) => {
  const filterCriteria = (obj: any) => obj.year === year;

  try {
    const parsedData = await GetData(vidwanId);
    const filteredData = parsedData.filter(filterCriteria);
    const structuredData = filteredData.map((obj: any) => {
      return {
        year: obj.year,
        importer1: obj.importer1,
        importer2: obj.importer2,
      };
    });
    const nodes = getNodes(structuredData);
    const edges = getEdges(structuredData, nodes);
    return { vidwanId, nodes, edges };
  } catch (error: any) {
    return error;
  }
};
