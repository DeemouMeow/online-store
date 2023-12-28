import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import BasketController from "../controllers/basketController.js";

const basketRouter = Router();

basketRouter.get("/", authMiddleware, BasketController.getAll);
basketRouter.post("/append", authMiddleware, BasketController.append);
basketRouter.post("/remove", authMiddleware, BasketController.remove);

export default basketRouter;