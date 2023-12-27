const { set, isBefore, isAfter } = require("date-fns");

/**
 * Calculate the period based on startTime and endTime.
 * Use this function when period === "hourly"'s searching.
 * @param {Date} startTime - The start time of the period.
 * @param {Date} endTime - The end time of the period.
 * @returns {string[]} - An array of period(s) or 'unknown' if none of the cases match.
 */
const calculatePeriod = (startTime, endTime) => {
  const morningEnd = set(startTime, {
    hours: 12,
    minutes: 10,
    seconds: 0,
    milliseconds: 0,
  });
  const afternoonEnd = set(startTime, {
    hours: 17,
    minutes: 10,
    seconds: 0,
    milliseconds: 0,
  });
  switch (true) {
    // 1.endtime在12:10前，period是morning
    case isBefore(endTime, morningEnd):
      return ["morning"];
    // 2.starttime在12:10前，endtime在12:10後且17:10前，period是morning、afternoon
    case isBefore(startTime, morningEnd) &&
      isAfter(endTime, morningEnd) &&
      isBefore(endTime, afternoonEnd):
      return ["morning", "afternoon"];
    // 3.starttime在12:10前，endtime在17:10後，period是morning、afternoon、evening
    case isBefore(startTime, morningEnd) && isAfter(endTime, afternoonEnd):
      return ["morning", "afternoon", "evening"];
    // 4.starttime在12:10後且在17:10前，endtime在17:10前，period是afternoon
    case isAfter(startTime, morningEnd) &&
      isBefore(startTime, afternoonEnd) &&
      isBefore(endTime, afternoonEnd):
      return ["afternoon"];
    // 5.starttime在12:10後且在17:10前，endtime在17:10後，period是afternoon、evening
    case isAfter(startTime, morningEnd) &&
      isBefore(startTime, afternoonEnd) &&
      isAfter(endTime, afternoonEnd):
      return ["afternoon", "evening"];
    // 6.starttime在17:10後，period是evening
    case isAfter(startTime, afternoonEnd):
      return ["evening"];
    default:
      return "unknown";
  }
};

/**
 * Middleware to check and calculate the period based on startTime and endTime from query parameters.
 * If the parameters are missing, it sends a 400 response with an error message.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
 */
const checkPeriodMiddleware = (req, res, next) => {
  const { startTime, endTime } = req.query;

  if (!startTime || !endTime) {
    return res
      .status(400)
      .json({ message: "Missing starttime or endtime in the request" });
  }

  const period = calculatePeriod(new Date(startTime), new Date(endTime));
  req.query.period = period;
  next();
};

module.exports = { checkPeriodMiddleware };
