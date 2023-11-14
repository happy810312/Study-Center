let JwtStrategy = require("passport-jwt").Strategy; // 當要驗證jwt是否合法時，才會使用此strategy
let ExtractJwt = require("passport-jwt").ExtractJwt;
let GoogleStrategy = require("passport-google-oauth20").Strategy;
let FacebookStrategy = require("passport-facebook").Strategy;

const User = require("../models/index").user;

function generateRandomPassword(length) {
  let result;
  const charactors =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random(charactors.length));
    result += charactors.charAt(randomIndex);
  }
  return result;
}

// JWT
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = {
  jwtStrategy: new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      let foundUser = await User.findOne({
        _id: jwt_payload._id,
        email: jwt_payload.email,
      }).exec();
      if (foundUser) {
        return done(null, foundUser);
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(e, false);
    }
  }),
  googleStrategy: new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("進入Google Strategy的區域");
      //   console.log(profile);
      //   console.log("======================");
      try {
        let foundUser = await User.findOne({
          googleID: profile.id,
        }).exec();
        if (foundUser) {
          console.log("使用者已經註冊過了。無須存入資料庫內。");
          done(null, foundUser);
        } else {
          console.log("偵測到新用戶。須將資料存入資料庫內");
          let newUser = new User({
            username: profile.displayName,
            googleID: profile.id,
            thumbnail: profile.photos[0].value,
            password: generateRandomPassword(12),
          });
          let savedUser = await newUser.save();
          console.log("成功創建新用戶。");
          done(null, savedUser);
          // console.log(profile);
        }
      } catch (e) {
        console.log(e);
      }
    }
  ),
  facebookStrategy: new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:8080/api/auth/facebook/redirect",
      profileFields: ["id", "displayName", "email", "picture"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("進入Facebook Strategy的區域");
      console.log(profile);
      //   console.log("======================");
      try {
        let foundUser = await User.findOne({
          facebookID: profile.id,
        }).exec();
        if (foundUser) {
          console.log("使用者已經註冊過了。無須存入資料庫內。");
          done(null, foundUser);
        } else {
          console.log("偵測到新用戶。須將資料存入資料庫內");
          let newUser = new User({
            username: profile.displayName,
            facebookID: profile.id,
            thumbnail: profile.photos[0].value,
            password: generateRandomPassword(12),
          });
          let savedUser = await newUser.save();
          console.log("成功創建新用戶。");
          done(null, savedUser);
          // console.log(profile);
        }
      } catch (e) {
        console.log(e);
      }
    }
  ),
};
