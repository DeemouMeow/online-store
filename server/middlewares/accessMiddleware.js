import jwt from "jsonwebtoken";
import { ACCESS_KEY, REFRESH_KEY } from "../services/tokenService.js";

export default function (role) {
    role = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    return function (req, res, next) {
        try {
            if (req.method === "OPTIONS") {
                next();
            }

            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "Not authorized!" });
            }
            
            const verify = jwt.verify(token, ACCESS_KEY);
            req.user = verify;

            console.log(verify);

            if (!verify.roles.includes(role))
                return res.status(403).json({ message: "Access denied!" });
            next();
        } catch (e) {
            res.status(401).json({ message: "Not authorized!" });
        }
    }
}