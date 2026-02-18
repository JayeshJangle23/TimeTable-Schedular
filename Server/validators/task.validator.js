const Joi = require("joi");

exports.createTaskValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  reminderTime: Joi.string()
    .pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "Reminder time must be in HH:MM format",
    }),
  frequency: Joi.string()
    .valid("once", "daily", "weekly", "monthly")
    .required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});
