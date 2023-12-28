import { Router } from "express";
import devicedRouter from "./deviceRouter.js";
import userRouter from "./userRouter.js";
import typeRouter from "./typeRouter.js";
import brandRouter from "./brandRouter.js";
import basketRouter from "./basketRouter.js";

const router = Router();

router.use("/user", userRouter);
router.use("/device", devicedRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/basket", basketRouter);

export default router;