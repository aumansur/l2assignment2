"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const fullNameSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
});
const addressSchema = joi_1.default.object({
    state: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
});
const customerValidationSchema = joi_1.default.object({
    userId: joi_1.default.string().required(),
    password: joi_1.default.string().required().max(20),
    userName: joi_1.default.string().required(),
    fullName: fullNameSchema,
    age: joi_1.default.number().required(),
    email: joi_1.default.string().required(),
    isActive: joi_1.default.boolean().required(),
    hobbies: joi_1.default.string().valid("Reading", "Writing", "Gaming"),
    address: addressSchema,
    order: joi_1.default.array().items(joi_1.default.object({
        productName: joi_1.default.string().allow(""),
        price: joi_1.default.number().allow(null),
        quantity: joi_1.default.number().allow(null),
    })),
});
exports.default = customerValidationSchema;
