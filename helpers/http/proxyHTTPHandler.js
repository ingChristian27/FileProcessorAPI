const proxyHTTPHandler = async (req, res, apiFunction) => {
  const { body, params, query } = req;

  try {
    const { response, error } = await apiFunction({
      values: body,
      params,
      query,
    });

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
