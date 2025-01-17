import { axiosClient } from '../../lib/index.js';

/**
 * Fetches a list of files from the external API.
 *
 * @returns {Array<string>} An array of file names (e.g., ['file1.csv', 'file2.csv']).
 */

const getFilesApi = async () => {
  const { data } = await axiosClient.get('/secret/files');
  return data.files;
};

export default getFilesApi;
