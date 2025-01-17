import {getFilesApi} from '../../services/files/index.js';

const getFiles = async () => {
  const files = await getFilesApi();

  return { response: { files } };
};

export default getFiles;
