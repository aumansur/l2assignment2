import { Schema, model } from "mongoose";
import { FullName, TCustomer, Address, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
const fullNameSchema = new Schema<FullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
const addressSchema = new Schema<Address>({
  state: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const customerSchema = new Schema<TCustomer, UserModel>({
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

customerSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
customerSchema.post("save", function () {
  //   console.log(this, "post hook: we saved our data");
});

// creating a custom static method

customerSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await Customer.findOne({ userId });
  return existingUser;
};
export const Customer = model<TCustomer, UserModel>("Customer", customerSchema);

// create model

// studentSchema.statics.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };
