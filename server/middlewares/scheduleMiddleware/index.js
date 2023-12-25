const Seat = require("../models").seat;

/**
 * Middleware: Fetch user schedules
 *
 * This middleware fetches schedules for the authenticated user
 *
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next middleware function
 * @returns {Promise<void>}
 */
const fetchUserSchedules = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const foundSchedules = await Seat.find({ user: _id });

    foundSchedules.sort((a, b) => {
      const startA = new Date(a.startTime);
      const startB = new Date(b.startTime);
      return startB - startA;
    });

    res.locals.foundSchedules = foundSchedules;

    next();
  } catch (error) {
    return res.status(500).json({ message: "User預約紀錄查詢錯誤" });
  }
};

/**
 * Middleware: Paginate Data
 *
 * This middleware processes paginated data based on the provided query parameters.
 * It calculates the start and end indices for the data, applies pagination, and stores relevant information in the Express response locals for later use.
 *
 * @param {Array} foundData - The array of data to be paginated
 * @returns {function} Middleware function
 */
const paginateData = (foundData) => {
  return (req, res, next) => {
    const { page, items } = req.query;
    const itemsPerPage = parseInt(items, 10) || 10;
    const pageNumber = parseInt(page, 10) || 1;
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage - 1;
    const foundDataLength = foundData.length;
    const dataToDisplay = foundData.slice(startIndex, endIndex + 1);
    res.locals.paginateData = {
      inputPage: page,
      inputItems: items,
      itemsPerPage: itemsPerPage,
      dataToDisplay: dataToDisplay,
      pageNumbers: Array.from(
        { length: foundDataLength },
        (_, index) => index + 1
      ),
    };
    next();
  };
};

module.exports = { fetchUserSchedules, paginateData };
