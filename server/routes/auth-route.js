const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/authController");

router.use((req, res, next) => {
  console.log("正在接收Auth route的請求");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("成功連結auth route...");
});

// ---------------------一般登入---------------------------
router.post("/register", authController.localRegister);
router.post("/login", authController.localLogin);

// ---------------------Google登入------------------------
router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"], // 加入email及select_account => 每次都可以選擇一個帳號來登入
    prompt: "select_account",
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONT_URL}/login`,
  }),
  authController.googleLogin
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
  authController.facebookLogin
);

module.exports = router;
