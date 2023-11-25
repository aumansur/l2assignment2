import { TCustomer } from "./user.interface";
import { Customer } from "./user.model";

const createUserIntoDb = async (userData: TCustomer) => {
  if (await Customer.isUserExists(userData.userId)) {
    throw new Error("User already exists");
  }
  const result = await Customer.create(userData);

  return result;
};

const getAllUserFromDb = async () => {
  const result = await Customer.find(
    {},
    { _id: 0, userName: 1, fullName: 1, age: 1, email: 1, address: 1 }
  );
  return result;
};
const getSingleUserFromDb = async (userId: string) => {
  const result = await Customer.findOne({ userId });
  return result;
};
const deleteSingleUserFromDb = async (userId: string) => {
  const result = await Customer.deleteOne({ userId });
  return result;
};

const updateSingleUserFromDb = async (userId: string, userData: TCustomer) => {
  if (await Customer.isUserExists(userId)) {
    const result = await Customer.updateOne(
      { id: userId },
      { $set: userData },
      { new: true }
    );
    return result;
  } else {
    return false;
  }
};
