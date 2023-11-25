import { TCustomer } from "./user.interface";
import { CustomerModel } from "./user.model";

const createUserIntoDb = async (userData: TCustomer) => {
  const result = await CustomerModel.create(userData);
  if (await CustomerModel.isUserExists(userData.id)) {
    throw new Error("User already exists");
  }
  return result;
};

const getAllUserFromDb = async () => {
  const result = await CustomerModel.find();
  return result;
};
const getSingleUserFromDb = async (id: string) => {
  const result = await CustomerModel.findOne({ id });
  return result;
};
const deleteSingleUserFromDb = async (id: string) => {
  const result = await CustomerModel.deleteOne({ id });
  return result;
};

export const UserServices = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
  deleteSingleUserFromDb,
};
