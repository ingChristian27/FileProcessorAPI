import { axiosClient } from '../../lib/index.js';

/**
 * Fetches the content of an individual file from the external API.
 *
 * @param {string} fileName - The name of the file to fetch (e.g., 'file1.csv').
 * @returns {string} A string representing the file's content in the format: "file,text,number,hex".
 *
 * Example response:
 * "file,text,number,hex\nfile1,Hello World,12345,abcde12345\nfile1,Another Line,67890,defgh67890"
 */

const getFileApi = async (fileName) => {
  const { data } = await axiosClient.get(`/secret/file/${fileName}`);
  return data;
};

export default getFileApi;
