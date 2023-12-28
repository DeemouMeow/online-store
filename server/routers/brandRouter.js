import { Router } from "express";
import BrandController from "../controllers/brandController.js";
import accessMiddleware from "../middlewares/accessMiddleware.js";

const brandRouter = Router();

brandRouter.post("/", accessMiddleware("Admin"), BrandController.create);
brandRouter.get("/", BrandController.getAll);

export default brandRouter;