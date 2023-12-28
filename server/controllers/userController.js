import TokenService from "../services/tokenService.js";
import UserService from "../services/userService.js";

export default class UserController {
    static async registration(req, res, next) {
        try {
            const { email, password, role } = req.body;
            const [user, tokens] = await UserService.registartion(email, password, role);

            const tokenAge = 30 * 24 * 60 * 60 * 1000;
            const cookieOptions = { maxAge: tokenAge, httpOnly: true };
            res.cookie("refreshToken", tokens.refreshToken, cookieOptions);

            return res.json({ user, tokens });
        } catch (e) {
            next(e);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const [user, tokens] = await UserService.login(email, password);

            const tokenAge = 30 * 24 * 60 * 60 * 1000;
            const cookieOptions = { maxAge: tokenAge, httpOnly: true };
            res.cookie("refreshToken", tokens.refreshToken, cookieOptions);

            return res.json({ user, tokens });
        } catch (e) {
            next(e);
        }
    }

    static async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;

            const user = req.user;
            const token = await UserService.logout(refreshToken);

            res.clearCookie("refreshToken");
            return res.json({ user, token });
        } catch (e) {
            next(e);
        }
    }

    static async getUsers(req, res, next) {
        try {
            const users = await UserService.getAll();

            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    static async getUser(req, res, next) {
        try {
            const id = req.params;
            const user = await UserService.getOne(id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    static async authorization(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const tokens = await UserService.authorization(refreshToken);

            const tokenAge = 30 * 24 * 60 * 60 * 1000;
            const cookieOptions = { maxAge: tokenAge, httpOnly: true };
            res.cookie("refreshToken", tokens.refreshToken, cookieOptions);

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
}