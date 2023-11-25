import { Model } from "mongoose";

export type FullName = {
  firstName: string;
  lastName: string;
};
export type Address = {
  state: string;
  city: string;
  country: string;
};
export type Order = {
  productName: string;
  price: number;
  quantity: number;
};

export type TCustomer = {
  userId: string;
  password: string;
  userName: string;
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: "Reading" | "Writing" | "Gaming";
  address: Address;
  order: Order[];
};

// create static method
export interface UserModel extends Model<TCustomer> {
  isUserExists(userId: string): Promise<TCustomer> | null;
}
