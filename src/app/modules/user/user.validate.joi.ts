import Joi from "joi";

const fullNameSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

const addressSchema = Joi.object({
  state: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

const customerValidationSchema = Joi.object({
  userId: Joi.string().required(),
  password: Joi.string().required().max(20),
  userName: Joi.string().required(),
  fullName: fullNameSchema,
  age: Joi.number().required(),
  email: Joi.string().required(),
  isActive: Joi.boolean().required(),
  hobbies: Joi.string().valid("Reading", "Writing", "Gaming"),
  address: addressSchema,
  order: Joi.array().items(
    Joi.object({
      productName: Joi.string().allow(""),
      price: Joi.number().allow(null),
      quantity: Joi.number().allow(null),
    })
  ),
});

export default customerValidationSchema;
