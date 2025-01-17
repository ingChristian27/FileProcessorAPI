/**
 * Processes the results of Promise.allSettled and separates them into resolved and rejected categories.
 */
const promiseAllOrReject = (results) => {
  const resolved = [];
  const rejected = [];

  results.forEach((res) => {
    if (res.status === 'fulfilled') {
      resolved.push(res.value); // Add the fulfilled value
    } else {
      rejected.push(res.reason); // Add the rejection reason
    }
  });

  return { resolved, rejected };
};

/**
 * Handles a list of promises and separates resolved and rejected results.
 *
 * @param {Array<Promise>} promises - An array of promises to process.
 * @returns {Object} An object containing:{ resolved: Array<any>, rejected: Array<any>}
 *
 */
const allSettled = async (promises) => {
  const response = await Promise.allSettled(promises);
  const { resolved, rejected } = promiseAllOrReject(response);
  return { resolved, rejected };
};

export default allSettled;
