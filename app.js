import Koa from "koa";
import bodyParser from "@koa/bodyparser";
import logger from "koa-logger";
import cors from "@koa/cors";
import { createConnection } from "mariadb";

import UsersModel from "./models/users.js";
import UserRouter from "./routes/users.js";

// 初始化 server
const server = new Koa();

// 初始化 database connection
const db = await createConnection({
    user: "root",
    pass: "",
    host: "localhost",
    database: "shopping_cart"
});

// 初始化 models
const models = {};
// users model
const users = new UsersModel(db);
models.users = users;
// products model

// 放到 context 裡面
server.context.models = models;

// 使用 bodyparser 解析 request body
server.use(bodyParser());
// 使用 cors 處理 cors policy
server.use(cors());
// 紀錄系統事件
server.use(logger());

// 放入 controller
server.use(UserRouter.routes());

// 監聽 3000 port
server.listen(3000, () => {
    console.log("server is running...")
});