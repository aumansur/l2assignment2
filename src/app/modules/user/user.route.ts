import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();
// will called controller
router.post("/users", UserControllers.createUser);
router.get("/users", UserControllers.getAllUsers);
router.get("/users/:userId", UserControllers.getSingleUser);
router.delete("/users/:userId", UserControllers.deleteSingleUser);
router.put("/users/:userId", UserControllers.updateSingleUser);

export const UserRoutes = router;
