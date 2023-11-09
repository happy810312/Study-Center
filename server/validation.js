const Joi = require("joi");

class Validation {
  registerValidation(data) {
    const schema = Joi.object({
      username: Joi.string().required().min(3).max(255),
      email: Joi.string().required().min(8).max(60),
      password: Joi.string().required().min(8).max(60),
      role: Joi.string().default("reader").valid("reader", "admin"),
    });
    return schema.validate(data);
  }
  loginValidation(data) {
    const schema = Joi.object({
      email: Joi.string().required().min(8).max(60),
      password: Joi.string().required().min(8).max(60),
    });
    return schema.validate(data);
  }
  seatValidation(data) {
    const schema = Joi.object({
      seatNumber: Joi.string().required(),
      startTime: Joi.date().required(),
      endTime: Joi.date().required(),
      price: Joi.date().required().min(20),
    });
    return schema.validate(data);
  }
}

module.exports = new Validation();
