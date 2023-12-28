import ApiErrors from "../errors/ApiErrors.js";
import { Type } from "../models/models.js";

export default class TypeController {
    static async create(req, res, next) {
        try {
            console.log("In create" );
            const { name } = req.body;
            const isTypeExist = await Type.findOne({ where: { name } });

            if (isTypeExist) throw ApiErrors.badRequest("Type is already exists!");
            const type = await Type.create({ name });

            return res.json(type);
        } catch (e) {
            next(e);
        }
    }

    static async getAll(req, res, next) {
        try {
            const types = await Type.findAll();
            res.json(types);
        } catch (e) {
            next(e);
        }
    }
}