import { Customer } from "./user.interface";
import { CustomerModel } from "./user.model";

const createUserIntoDb = async (customer: Customer) => {
  const result = await CustomerModel.create(customer);
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

export const UserServices = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
};
