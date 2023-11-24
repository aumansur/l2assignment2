import { Schema, model } from "mongoose";
import { FullName, Customer, Address } from "./user.interface";

const fullNameSchema = new Schema<FullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
const addressSchema = new Schema<Address>({
  state: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const customerSchema = new Schema<Customer>({
  id: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  fullName: fullNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  address: addressSchema,
  order: [
    {
      productName: { type: String, required: false },
      price: { type: Number, required: false },
      quantity: { type: Number, required: false },
    },
  ],
});

// create model
export const CustomerModel = model<Customer>("Customer", customerSchema);
