import {config} from "dotenv";
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import sequelize from "./db.js";
import router from "./routers/index.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import path from "path";
import cookieParser from "./middlewares/cookieParser.js";
import * as Models from "./models/models.js";

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(cookieParser);
app.use(fileUpload({}));
app.use("/api", express.static(path.resolve("static")));
app.use("/api", router);
app.use(errorMiddleware);

const connect = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log("Server working! " + PORT));
    } catch (e) {
        console.log(e);
    }
}

connect();