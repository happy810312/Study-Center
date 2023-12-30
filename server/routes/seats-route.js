const router = require("express").Router();
const seatsMiddleware = require("../middlewares/seatsMiddleware");
const seatsController = require("../controllers/seatsController");

router.use((req, res, next) => {
  console.log("正在接收一個seats route request...");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("正在接收一個seat api...");
});

router.get(
  "/",
  seatsMiddleware.checkPeriodMiddleware,
  seatsController.getAvaliableSeats
);
router.post("/", seatsController.postReservation);

module.exports = router;
