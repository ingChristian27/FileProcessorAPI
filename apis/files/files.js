import { getFilesApi, getFileApi } from '../../services/files/index.js';
import { formatFileData } from '../../helpers/file/index.js';
import { allSettled } from '../../utils/index.js';

const getFiles = async () => {
  const files = await getFilesApi();

  const { resolved: processedFiles } = await allSettled(
    files.map(async (file) => {
      try {
        const fileData = await getFileApi(file);
        const { response: formattedFileData, error: errorFormatFileData } =
          formatFileData(fileData);

        if (errorFormatFileData) throw new Error(errorFormatFileData);

        return formattedFileData;
      } catch (error) {
        throw new Error(`Error processing file ${file}: ${error.message}`);
      }
    }),
  );

  return { response: { files: processedFiles } };
};

export default getFiles;
