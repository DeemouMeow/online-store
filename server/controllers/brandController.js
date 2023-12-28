import { Brand } from "../models/models.js";
import ApiErrors from "../errors/ApiErrors.js";

export default class BrandController {
    static async create(req, res, next) {
        try {
            const { name } = req.body;
            const isBrandExist = await Brand.findOne({ where: { name } });

            if (isBrandExist) throw ApiErrors.badRequest("Brand is already exists!");
            
            const brand = await Brand.create({ name });

            return res.json(brand);
        } catch (e) {
            next(e);
        }
    }

    static async getAll(req, res) {
        try {
            const brands = await Brand.findAll();

            return res.json(brands);
        } catch (e) {
            next(e);
        }
    }
}