import { Basket, BasketDevice } from "../models/models.js";

export default class BasketController {
    static async append(req, res, next) {
        try {
            const { deviceId } = req.body;
            const existed = await BasketDevice.findOne({
                where: {
                    deviceId,
                    basketId: req.user.id
                }
            });

            if (existed) return res.json(existed);

            const basketDevice = await BasketDevice.create({
                deviceId, 
                basketId: req.user.id,
            });
            
            return res.json(basketDevice);
        } catch (e) {
            next(e);
        }
    }

    static async remove(req, res, next) {
        try {
            const { deviceId, basketId } = req.body;
            await BasketDevice.destroy({
                where: {
                    basketId,
                    deviceId
                }
            });

            return res.json({message: "Device deleted from your basket :3"});
        } catch (e) {
            next(e);
        }
    }

    static async getAll(req, res, next) {
        try {
            const devices = await BasketDevice.findAll({
                where: {
                    basketId: req.user.id
                }
            });

            return res.json(devices);
        } catch (e) {
            next(e);
        }
    }
}