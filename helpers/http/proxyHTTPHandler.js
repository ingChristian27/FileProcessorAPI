/**
 * HTTP proxy handler that calls an API function and manages the response.
 *
 * @param {Object} req - The HTTP request object (Express).
 * @param {Object} res - The HTTP response object (Express).
 * @param {Function} apiFunction - The API function to be called.
 *
 * @returns {Object} - The JSON response to be sent to the client.
 *
 * If the API function returns an error, a 500 status with the error details is sent.
 * If successful, the response is returned with a 200 status and the API response data.
 */

const proxyHTTPHandler = async (req, res, apiFunction) => {
  const { body, params, query } = req;

  try {
    const { response, error } = await apiFunction({
      values: body,
      params,
      query,
    });

    // Set the response content type to JSON
    res.setHeader('Content-Type', 'application/json');

    if (error) {
      console.error(error);
      res.status(500).json({
        code: error.code,
        message: error.message,
        url: req.originalUrl,
      });
      return;
    }

    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: error.message,
      url: req.originalUrl,
      stack: error.stack,
    });
  }
};

export default proxyHTTPHandler;
