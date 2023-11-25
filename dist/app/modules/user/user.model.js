"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const fullNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});
const addressSchema = new mongoose_1.Schema({
    state: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});
const customerSchema = new mongoose_1.Schema({
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    fullName: fullNameSchema,
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: String, enum: ["Reading", "Writing", "Gaming"] },
    address: addressSchema,
    order: [
        {
            productName: { type: String, required: false },
            price: { type: Number, required: false },
            quantity: { type: Number, required: false },
        },
    ],
});
customerSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
customerSchema.post("save", function () {
    console.log(this, "post hook: we saved our data");
});
// creating a custom static method
// customerSchema.statics.isUserExits = async function (userId: string) {
//   const existingUser = await Customer.findOne({ id });
//   return existingUser;
// };
// create model
exports.Customer = (0, mongoose_1.model)("Customer", customerSchema);
