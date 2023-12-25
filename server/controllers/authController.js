const User = require("../models/index").user;
const Validation = require("../validation");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

/**
 * @desc Local register
 * @route POST / api/auth/register
 * @access Public
 */
const localRegister = asyncHandler(async (req, res) => {
  const { error } = Validation.registerValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(400)
      .json({ message: "This email address has already been registered." });

  const { username, email, password, role } = req.body;
  const newUser = new User({ username, email, password, role });

  const savedUser = await newUser.save();

  if (!savedUser)
    return res
      .status(500)
      .json({ message: "Server error, please register again." });

  return res.json({
    message: "使用者創建成功",
    savedUser,
  });
});

/**
 * @desc Local login
 * @route POST / api/auth/login
 * @access Public
 */
const localLogin = async (req, res) => {
  let { error } = Validation.loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser)
    return res
      .status(404)
      .json({ message: "無法找到使用者，請確認信箱或密碼是否填寫正確" });

  foundUser.comparePassword(req.body.password, (_, isMatch) => {
    if (isMatch) {
      const tokenObject = { _id: foundUser._id, email: foundUser.email };
      let token = jwt.sign(tokenObject, process.env.JWT_SECRET);
      return res.json({
        message: "成功登入",
        token: "JWT " + token,
        user: foundUser,
      });
    } else {
      return res.status(400).json({ message: "密碼錯誤，請重新輸入" });
    }
  });
};

/**
 * @desc Google login
 * @route GET / api/auth/google/redirect
 * @access Public
 */
const googleLogin = async (req, res) => {
  console.log("進入Google redirect區域");
  // jwt token to localstorage
  if (req.user) {
    const { _id, googleID } = req.user;
    const tokenObject = { _id, googleID };
    const token = jwt.sign(tokenObject, process.env.JWT_SECRET);
    res.cookie(
      "User",
      JSON.stringify({
        message: "成功登入",
        token: "JWT " + token,
        user: req.user,
      })
    );
    res.redirect(`${process.env.FRONT_URL}/profile`);
  } else {
    return res.status(400).redirect(`${process.env.FRONT_URL}/login`);
  }
};

/**
 * @desc Facebook login
 * @route GET / api/auth/facebook/redirect
 * @access Public
 */
const facebookLogin = async (req, res) => {
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
};

module.exports = { localRegister, localLogin, googleLogin, facebookLogin };
