const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  cardID: {
    type: String,
    default: function () {
      const min = 0;
      const max = 999999;
      const number = Math.floor(Math.random() * (max - min + 1)) + min;
      return String(number).padStart(6, "0");
    },
  },
  googleID: {
    type: String,
  },
  facebookID: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  username: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    minLength: 8,
    maxLength: 60,
  },
  password: {
    type: String,
    require: true,
    minLength: 8,
    maxLength: 60,
  },
  role: {
    type: String,
    enum: ["reader", "admin"],
    default: "reader",
  },
  wallet: {
    type: Number,
    require: true,
    default: 0,
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value) {
        return /^(\d{4}-\d{3}-\d{3})$/.test(value);
      },
      message: "Invalid phone number format. Please use XXXX-XXX-XXX format.",
    },
  },
});

// instance method => 用於middleware authenticate
userSchema.methods.isAdmin = function () {
  return this.role == "admin";
};
userSchema.methods.isReader = function () {
  return this.role == "reader";
};
userSchema.methods.comparePassword = async function (password, callback) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return callback(null, result);
  } catch (e) {
    return callback(e, result);
  }
};
// userSchema.pre("save", function)，執行完save動作後會再接續執行function的內容
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saultRound = 10;
    const hashValue = await bcrypt.hash(this.password, saultRound);
    this.password = hashValue;
  }
  next();
});

// 產生一個名稱為users的collection
module.exports = mongoose.model("User", userSchema);
