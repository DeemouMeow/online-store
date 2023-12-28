import { Router } from "express";
import DeviceController from "../controllers/deviceController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const devicedRouter = Router();

devicedRouter.post("/", authMiddleware, DeviceController.append);
devicedRouter.get("/", DeviceController.getAll);
devicedRouter.get("/:id", DeviceController.getOne);

export default devicedRouter;