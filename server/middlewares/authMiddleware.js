import jwt from "jsonwebtoken";
import { ACCESS_KEY, REFRESH_KEY } from "../services/tokenService.js";

export default function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Not authorized!" });
        }

        const verify = jwt.verify(token, ACCESS_KEY);
        req.user = verify;
        next();
    } catch (e) {
        res.status(401).json({ message: "Not authorized!" });
    }
}