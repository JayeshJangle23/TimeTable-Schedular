// const Joi = require("joi");

// exports.createTaskSchema = Joi.object({
//   title: Joi.string().min(3).max(100).required(),
//   description: Joi.string().allow(""),
//   reminderAt: Joi.date().required(),
//   frequency: Joi.string().valid("once", "daily", "weekly", "monthly"),
// });

const Joi = require("joi");

exports.createTaskValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  reminderAt: Joi.date().required(),
  frequency: Joi.string()
    .valid("once", "daily", "weekly", "monthly")
    .required(),
});
