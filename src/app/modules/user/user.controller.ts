import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  // send response
  try {
    const { user: userData } = req.body;
    // will called service func to send this data
    const result = await UserServices.createUserIntoDb(userData);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDb();
    res.status(200).json({
      success: true,
      message: "User is retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: "User is retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
};
