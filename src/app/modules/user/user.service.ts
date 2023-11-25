import { TCustomer } from "./user.interface";
import { Customer } from "./user.model";

const createUserIntoDb = async (userData: TCustomer) => {
  const result = await Customer.create(userData);

  //   if (await Customer.isUserExits(userData.id)) {
  //     throw new Error("User already exists");
  //   }
  return result;
};

const getAllUserFromDb = async () => {
  const result = await Customer.find();
  return result;
};
const getSingleUserFromDb = async (id: string) => {
  const result = await Customer.findOne({ id });
  return result;
};
const deleteSingleUserFromDb = async (id: string) => {
  const result = await Customer.deleteOne({ id });
  return result;
};

export const UserServices = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
  deleteSingleUserFromDb,
};
