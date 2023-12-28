import ApiErrors from "../errors/ApiErrors.js";
import { User, Basket } from "../models/models.js";
import bcrypt from "bcrypt";
import TokenService from "./tokenService.js";
import { generateUserData } from "../DTOs/userDTO.js";

export default class UserService {
    static async registartion(email, password, role) {
        const candidate = await UserService.isUser(email);

        if (candidate) throw ApiErrors.badRequest("User with same email is already registered!");

        const salt = 5;
        const hashPassword = bcrypt.hashSync(password, salt);

        const user = await User.create({
            email,
            password: hashPassword
        });

        if (role) {
            role = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
            role !== "User" ? await user.update({ roles: [...user.roles, role]}) : null;
        }

        await Basket.create({ userId: user.id });
        const tokens = await TokenService.generateTokens(user);
        const userData = generateUserData(user);

        return [userData, tokens];
    }

    static async login(email, password) {
        const candidate = await UserService.isUser(email);

        if (!candidate) 
            throw ApiErrors.badRequest("User with same email isn't registered!");

        const hashPassword = bcrypt.compareSync(password, candidate.password);

        if (!hashPassword) 
            throw ApiErrors.badRequest("Password is wrong!");
        
        const tokens = await TokenService.generateTokens(candidate);
        const userData = generateUserData(candidate);

        return [userData, tokens];
    }

    static async logout(token) {
        if (!token) {
            throw ApiErrors.badRequest("Token wasn't provided!");
        }

        return await TokenService.setNullToken(token);
    }

    static async authorization(refreshToken) {
        const token = await TokenService.findToken(refreshToken);
        const user = await UserService.getOne(token.id);

        const tokens = await TokenService.generateTokens(user);
        return tokens;
    }

    static async getAll() {
        const users = await User.findAll();
        return [...users].map(user => generateUserData);
    }

    static async getOne(id) {
        const user = await User.findOne({ where: { id } });
        const userData = generateUserData(user);
        return userData;
    }

    static async isUser(email) {
        if (!email) 
            throw ApiErrors.badRequest("Email wasn't provided!");

        const candidate = await User.findOne({
            where: {
                email
            }
        });

        return candidate;
    }
}