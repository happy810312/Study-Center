const { subMonths } = require("date-fns");

const router = require("express").Router();
const News = require("../models").news;
const passport = require("passport");

router.use((req, res, next) => {
  console.log("正在接收news route的請求");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("news route...");
});

// 讀取get資料庫news collection data
router.get("/", async (req, res) => {
  const currentDate = new Date();
  const halfYearAgoDate = subMonths(currentDate, 6);
  try {
    const foundNews = await News.aggregate([
      {
        $lookup: {
          from: "users", // User model對應的collection名稱
          localField: "createAdmin", // 本地collection片段，用於對應關聯
          foreignField: "_id", // 外部collection片段，用於對應關聯
          as: "createdBy", // 連接後的結果儲存在createdBy
        },
      },
      {
        $match: {
          createAt: { $gte: halfYearAgoDate },
          "createdBy.role": "reader",
        },
      },
    ]).exec();
    if (foundNews.length === 0) {
      return res.send({ message: "No matching news found." });
    }
    return res.send({ foundNews });
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 新增post一個news
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { title, content } = req.body;
    const newPost = new News({
      title,
      content,
      createAdmin: req.user._id,
    });
    try {
      const savedPost = await newPost.save();
      return res.send({ savedPost, message: "Post saved." });
    } catch (e) {
      return res.status(500).send(e);
    }
  }
);
// 編輯patch一個news

module.exports = router;
