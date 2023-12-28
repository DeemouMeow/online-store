import { Device, DeviceInfo } from "../models/models.js";
import { v4 } from "uuid";
import path from "path";

export default class DeviceController {
    static async append(req, res, next) {
        try {
            const { name, price, typeId, brandId, info } = req.body;
            const { img } = req.files;

            const fileName = v4() + ".jpg";
            img.mv(path.resolve("static", fileName));

            const device = await Device.create({ name, price, typeId, brandId, img: fileName });

            if (info) {
                (JSON.parse(info)).forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    });
                })
            }

            return res.json({device: {...device.dataValues, info: JSON.parse(info)}});
        } catch (e) {
            next(e);
        }
    }

    static async getAll(req, res, next) {
        try {
            const { typeId, brandId, limit = 5, page = 1 } = req.query;
            const selector = {};
            const offset = limit * (page - 1);

            if (typeId) selector.typeId = typeId;
            if (brandId) selector.brandId = brandId;

            const devices = await Device.findAndCountAll({
                where: selector,
                limit,
                offset
            });

            const infos = await DeviceInfo.findAll();
            return res.json({devices, infos});
        } catch (e) {
            next(e);
        }
    }

    static async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const device = await Device.findOne({
                where: {
                    id
                },
                include: [{model: DeviceInfo, as: "info"}]
            });

            return res.json(device);
        } catch (e) {
            next(e);
        }
    }
}