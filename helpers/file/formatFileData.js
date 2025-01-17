/**
 * Formats CSV data into a structured object by parsing the rows and validating their content.
 * Returns an object with `response` or `error`.
 *
 * @param {string} fileData - The CSV string containing rows of data.
 *
 * @returns {Object} - An object containing:
 *   - response (Object|null):
 *     - file (string): The file name from the first valid row.
 *     - lines (array): Parsed and validated rows with file, text, number, and hex.
 *   - error (string|null): Error message if something goes wrong (header or data validation).
 *
 */

const formatFileData = (fileData) => {
  const rows = fileData.split('\n');
  const [header, ...lines] = rows;

  const expectedHeader = 'file,text,number,hex';
  if (header !== expectedHeader) {
    return { response: null, error: `Invalid CSV header: ${header}` };
  }

  const formattedLines = [];

  lines.forEach((line) => {
    const [file, text, number, hex] = line.split(',');

    const isEmptyField = !file || !text || !number || !hex;
    if (isEmptyField) return;

    const parsedNumber = parseInt(number, 10);

    const isNumber = !isNaN(parsedNumber);
    const isHex = hex.length === 32;

    if (!isNumber || !isHex) return;

    formattedLines.push({
      file,
      text,
      number: parsedNumber,
      hex,
    });
  });

  if (formattedLines.length === 0) {
    return { response: null, error: 'No valid data found in the file.' };
  }

  const fileName = formattedLines[0].file;

  return {
    response: {
      file: fileName,
      lines: formattedLines,
    },
    error: null,
  };
};

export default formatFileData;
