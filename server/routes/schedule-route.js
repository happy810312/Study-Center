const router = require("express").Router();
const scheduleController = require("../controllers/scheduleController");

router.use((req, res, next) => {
  console.log("正在接收一個request...");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("正在接收一個schedule api...");
});

router.get("/", scheduleController.getSchedules);
router.delete("/", scheduleController.deleteSchedules);

module.exports = router;
