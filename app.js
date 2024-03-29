import Koa from "koa";
import bodyParser from "@koa/bodyparser";
import logger from "koa-logger";
import cors from "@koa/cors";
import { createConnection } from "mariadb";

import UsersModel from "./models/users.js";
import UsersRouter from "./routes/users.js";
import ProductsModel from "./models/products.js";
import ProductsRouter from "./routes/products.js";
import CartsModel from "./models/carts.js";
import CartsRouter from "./routes/carts.js";
import OrdersModel from "./models/orders.js";
import OrdersRouter from "./routes/orders.js";

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
const products = new ProductsModel(db);
models.products = products;
// carts model
const carts = new CartsModel(db);
models.carts = carts;

const orders = new OrdersModel(db);
models.orders = orders;
// 放到 context 裡面
server.context.models = models;

// 使用 bodyparser 解析 request body
server.use(bodyParser());
// 使用 cors 處理 cors policy
server.use(cors());
// 紀錄系統事件
server.use(logger());

// 放入 controller
server.use(UsersRouter.routes());
server.use(ProductsRouter.routes());
server.use(CartsRouter.routes());
server.use(OrdersRouter.routes());


// 監聽 3000 port
server.listen(3000, () => {
    console.log("server is running...")
});