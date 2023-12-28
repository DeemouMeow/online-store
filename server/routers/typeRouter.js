import { Router } from "express";
import TypeController from "../controllers/typeController.js";
import accessMiddleware from "../middlewares/accessMiddleware.js";

const typeRouter = Router();

typeRouter.post("/", accessMiddleware("Admin"), TypeController.create);
typeRouter.get("/", TypeController.getAll);

export default typeRouter;