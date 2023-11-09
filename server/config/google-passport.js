// const passport = require("passport");
module.exports = (passport) => {
  const GoogleStrategy = require("passport-google-oauth20").Strategy;
  const User = require("../models/user-model");

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/redirect",
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("進入Google Strategy的區域");
        //   console.log(profile);
        //   console.log("======================");
        try {
          let foundUser = await User.findOne({ googleID: profile.id }).exec();
          if (foundUser) {
            console.log("使用者已經註冊過了。無須存入資料庫內。");
            done(null, foundUser);
          } else {
            console.log("偵測到新用戶。須將資料存入資料庫內");
            let newUser = new User({
              name: profile.displayName,
              googleID: profile.id,
              thumbnail: profile.photo[0].value,
              email: profile.emails[0].value,
            });
            let savedUser = await newUser.save();
            console.log("成功創建新用戶。");
            done(null, savedUser);
          }
        } catch (e) {
          console.log(e);
        }
      }
    )
  );
};
