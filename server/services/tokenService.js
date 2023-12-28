import jwt from "jsonwebtoken";
import { Token } from "../models/models.js";

export const ACCESS_KEY = "ACCESS_KEY";
export const REFRESH_KEY = "REFRESH_KEY";

export default class TokenService {
    static async generateTokens(user) {
        const payload = { id: user.id, email: user.email, roles: user.roles };

        const accessToken = jwt.sign(payload, ACCESS_KEY, { expiresIn: "30m" });
        const refreshToken = jwt.sign(payload, REFRESH_KEY, { expiresIn: "30d" });

        await TokenService.saveToken(refreshToken, user.id);

        return { accessToken, refreshToken };
    }

    static async saveToken(token, userId) {
        const savedToken = await Token.findOne({
            where: {
                userId
            }
        });

        if (savedToken) 
            return await Token.update({ token }, { where: { userId } });

        return await Token.create({
            userId,
            token
        });
    }

    static async setNullToken(token) {
        await Token.update({ token: null }, { where: { token } });
        return token;
    }

    static async findToken(token) {
        const savedToken = await Token.findOne({
            where: {
                token
            }
        });

        return savedToken;
    }
}