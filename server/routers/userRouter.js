import { Router } from "express";
import UserController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import accessMiddleware from "../middlewares/accessMiddleware.js";

const userRouter = Router();

// userRouter.get("/", accessMiddleware("Admin"), UserController.getUsers);
// userRouter.get("/:id", accessMiddleware("Admin"),UserController.getUser);
userRouter.get("/auth", UserController.authorization);
userRouter.post("/registration", UserController.registration);
userRouter.post("/login", UserController.login);
userRouter.post("/logout", UserController.logout);

export default userRouter;