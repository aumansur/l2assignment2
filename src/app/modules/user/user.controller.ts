import { Request, Response } from "express";
import { UserServices } from "./user.service";
import customerValidationSchema from "./user.validate.joi";

const createUser = async (req: Request, res: Response) => {
  // send response
  try {
    const { user: userData } = req.body;
    const result = await UserServices.createUserIntoDb(userData);
    const { error } = customerValidationSchema.validate(userData);
    if (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: {
          code: 404,
          description: error.message || "Something went wrong",
        },
      });
    }
    // will called service func to send this data

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: error.message || "User not found!",
      },
    });
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
    res.status(200).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
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
    res.status(200).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteSingleUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const result = await UserServices.updateSingleUserFromDb(userId, userData);
    if (result) {
      userData.password = " ";
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: userData,
      });
    }
    return res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User Id not found!",
      },
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
};
