const router = require("express").Router();
const Validation = require("../validation");
const User = require("../models/index").user;

// file libraby
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const uploadDirectory = path.join(
  "C:",
  "Users",
  "littl",
  "Dropbox",
  "html",
  "side_project",
  "client",
  "public",
  "images",
  "user-uploads"
);
// 設定文件上傳的儲存路徑、文件名
const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

// middle ware
router.use((req, res, next) => {
  console.log("user route正在接受一個request...");
  next();
});

// test api
router.get("/testAPI", (req, res) => {
  return res.send("成功連結auth route...");
});

// 查詢照片資料夾的照片名稱(不需要用到)
router.get("/files/picturesName", (req, res) => {
  fs.readdir(uploadDirectory, (err, files) => {
    if (err) return res.status(500).send(err);
    let existingFiles = {};
    files.forEach((file, index) => {
      existingFiles[file] = path.join(uploadDirectory, file);
    });
    return res.send(existingFiles);
  });
});

// 上傳照片
router.post("/files/picturesName", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  try {
    const uploadFileName = req.file.name;
    return res.send(uploadFileName);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 會員ID抓會員資料
router.get("/profile/:_id", async (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  try {
    const foundUser = await User.findOne({ _id }).exec();
    if (!foundUser) return res.status(404).send({ message: "User not found" });
    return res.send(foundUser);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 會員修改電話
router.patch("/phoneNumber/:_id", async (req, res) => {
  const { _id } = req.params;
  const { newPhone } = req.body;
  try {
    const foundUser = await User.findOneAndUpdate(
      { _id },
      { $set: { phoneNumber: newPhone } },
      { new: true }
    ).exec();

    if (!foundUser) return res.status(400).send("cannot find user.");

    return res.send({ msg: "Renew phone number successfully", foundUser });
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 儲值wallet
router.patch("/deposit/:_id", async (req, res) => {
  const { _id } = req.params;
  const { newDeposit } = req.body;
  try {
    const foundUser = await User.findOneAndUpdate(
      { _id },
      { $inc: { wallet: newDeposit } },
      { new: true }
    ).exec();

    if (!foundUser) return res.status(404).send("No user found.");

    const savedUser = await foundUser.save();
    return res.send({
      msg: "Recharge successfully.",
      savedUser,
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
