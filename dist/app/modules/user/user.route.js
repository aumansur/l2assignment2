"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// will called controller
router.post("/users", user_controller_1.UserControllers.createUser);
router.get("/users", user_controller_1.UserControllers.getAllUsers);
router.get("/users/:userId", user_controller_1.UserControllers.getSingleUser);
router.delete("/users/:userId", user_controller_1.UserControllers.deleteSingleUser);
exports.UserRoutes = router;
