const router = require("express").Router();
const passport = require("passport");
const Validation = require("../validation");
const User = require("../models/index").user;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("正在接收Auth route的請求");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("成功連結auth route...");
});

// ---------------------Google登入------------------------
router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    // 每次都可以選擇一個帳號來登入 => 加入email及select_account
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONT_URL}/login`,
  }),
  (req, res) => {
    console.log("進入Google redirect區域");
    // jwt token to localstorage
    const foundUser = req.user;
    if (foundUser) {
      const tokenObject = { _id: foundUser._id, googleID: foundUser.googleID };
      let token = jwt.sign(tokenObject, process.env.JWT_SECRET);
      res.cookie(
        "User",
        JSON.stringify({
          message: "成功登入",
          token: "JWT " + token,
          user: foundUser,
        })
      );
      res.redirect(`${process.env.FRONT_URL}/profile`);
    } else {
      return res.status(400).redirect(`${process.env.FRONT_URL}/login`);
    }
  }
);

// ---------------------Facebook登入---------------------
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: "email", session: false })
);

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    scope: "email",
    session: false,
    failureRedirect: `${process.env.FRONT_URL}/login`,
  }),
  (req, res) => {
    console.log("Facebook redirect區域");
    // jwt token to localstorage
    const foundUser = req.user;
    if (foundUser) {
      const tokenObject = {
        _id: foundUser._id,
        facebookID: foundUser.facebookID,
      };
      let token = jwt.sign(tokenObject, process.env.JWT_SECRET);
      res.cookie(
        "User",
        JSON.stringify({
          message: "成功登入",
          token: "JWT " + token,
          user: foundUser,
        })
      );
      res.redirect(`${process.env.FRONT_URL}/profile`);
    } else {
      return res.status(400).redirect(`${process.env.FRONT_URL}/login`);
    }
  }
);

// ---------------------一般登入---------------------------
router.post("/register", async (req, res) => {
  // console.log(Validation.registerValidation(req.body));
  let { error } = Validation.registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(400)
      .send("This email address has already been registered.");

  let { username, email, password, role } = req.body;
  let newUser = new User({ username, email, password, role });
  try {
    const savedUser = await newUser.save();
    return res.send({
      msg: "使用者創建成功",
      savedUser,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/login", async (req, res) => {
  let { error } = Validation.loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser)
    return res.status(500).send("無法找到使用者，請確認信箱或密碼是否填寫正確");

  foundUser.comparePassword(req.body.password, (err, isMatch) => {
    if (isMatch) {
      const tokenObject = { _id: foundUser._id, email: foundUser.email };
      let token = jwt.sign(tokenObject, process.env.JWT_SECRET);
      return res.send({
        message: "成功登入",
        token: "JWT " + token,
        user: foundUser,
      });
    } else {
      return res.status(400).send("密碼錯誤");
    }
  });
});

router.delete("/", async (req, res) => {
  let deletedUser = await User.findOneAndDelete({}).exec();
  return res.send(deletedUser);
});
module.exports = router;
