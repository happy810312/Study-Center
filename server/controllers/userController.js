const User = require("../models/index").user;

/**
 * @desc get user profile when loading profile page
 * @route GET / api/user/:_id
 * @access Private
 */
const getUserProfile = async (req, res) => {
  const { _id } = req.params;
  try {
    const foundUser = await User.findOne({ _id }).exec();
    if (!foundUser) return res.status(404).json({ message: "User not found" });
    return res.json({ foundUser });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

/**
 * @desc Update user thumbnail
 * @route PATCH / api/user/picture/:_id
 * @access Private
 */
const patchUserPicture = async (req, res) => {
  const { _id } = req.params;
  const { file } = req.body;

  try {
    const foundUser = await User.findOneAndUpdate(
      { _id },
      { $set: { thumbnail: file } },
      { new: true }
    ).exec();

    if (!foundUser)
      return res.status(400).json({ message: "Cannot find user." });

    return res.json({
      message: "Update user thumbnail successfully.",
      foundUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

/**
 * @desc Update user phoneNumber
 * @route PATCH / api/user/phoneNumber/:_id
 * @access Private
 */
const patchUserPhoneNumber = async (req, res) => {
  const { _id } = req.params;
  const { newPhone } = req.body;
  try {
    const foundUser = await User.findOneAndUpdate(
      { _id },
      { $set: { phoneNumber: newPhone } },
      { new: true }
    ).exec();

    if (!foundUser)
      return res.status(400).json({ message: "Cannot find user." });

    return res.json({
      message: "Update phone number successfully.",
      foundUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

/**
 * @desc pay and update user wallet
 * @route PATCH / api/user/deposit/:_id
 * @access Private
 */
const patchUserDeposit = async (req, res) => {
  const { _id } = req.params;
  const { newDeposit } = req.body;
  try {
    const foundUser = await User.findOneAndUpdate(
      { _id },
      { $inc: { wallet: newDeposit } },
      { new: true }
    ).exec();

    if (!foundUser) return res.status(404).json({ message: "No user found." });

    const savedUser = await foundUser.save();
    return res.json({
      message: "Recharge successfully.",
      savedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getUserProfile,
  patchUserPicture,
  patchUserPhoneNumber,
  patchUserDeposit,
};
