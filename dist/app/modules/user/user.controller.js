"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const user_validate_joi_1 = __importDefault(require("./user.validate.joi"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // send response
    try {
        const { user: userData } = req.body;
        const result = yield user_service_1.UserServices.createUserIntoDb(userData);
        const { error } = user_validate_joi_1.default.validate(userData);
        if (error) {
            //   res.status(500).json({
            //     success: false,
            //     message: "Something went wrong",
            //     error: {
            //       code: 404,
            //       description: "Something went wrong",
            //     },
            //   });
            console.log(error);
        }
        // will called service func to send this data
        res.status(200).json({
            success: true,
            message: "User created successfully",
            data: result,
        });
    }
    catch (error) {
        // res.status(200).json({
        //   success: false,
        //   message: "User not found",
        //   error: {
        //     code: 404,
        //     description: "User not found!",
        //   },
        // });
        console.log(error);
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUserFromDb();
        res.status(200).json({
            success: true,
            message: "User is retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getSingleUserFromDb(userId);
        res.status(200).json({
            success: true,
            message: "User is retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
const deleteSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.deleteSingleUserFromDb(userId);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
exports.UserControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteSingleUser,
};
