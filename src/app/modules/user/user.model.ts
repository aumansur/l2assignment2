import { Schema, model } from "mongoose";
import { FullName, TCustomer, Address, UserModel } from "./user.interface";

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
  id: { type: String, required: true, unique: true },
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

// creating a custom static method
customerSchema.statics.isUserExits = async function (id: string) {
  const existingUser = await CustomerModel.findOne({ id });
  return existingUser;
};

// create model
export const CustomerModel = model<TCustomer>("Customer", customerSchema);
