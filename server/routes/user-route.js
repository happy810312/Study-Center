const router = require("express").Router();
const userController = require("../controllers/userController");

// middle ware
router.use((req, res, next) => {
  console.log("user route正在接受一個request...");
  next();
});

// test api
router.get("/testAPI", (req, res) => {
  return res.send("成功連結auth route...");
});

router.get("/:_id", userController.getUserProfile);
router.patch("/picture:_id", userController.patchUserPicture);
router.patch("/phoneNumber/:_id", userController.patchUserPhoneNumber);
router.patch("/deposit/:_id", userController.patchUserDeposit);

module.exports = router;
