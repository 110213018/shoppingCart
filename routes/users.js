import Router from "@koa/router";

import { generateAccessToken } from "../lib/token.js";

const router = new Router();

router.post("/users/", async (ctx) => {
    const request = ctx.request.body;
    const username = request.username;
    const password = request.password;
    const role = request.role;
    const model = ctx.models.users;
    const user = await model.create(username, password, role);
    ctx.status = 201;
    ctx.response.body = {
        msg: "Created",
        data: user,
    }
});

router.post("/users/login", async (ctx) => {
    const request = ctx.request.body;
    const username = request.username;
    const password = request.password;
    const role = request.role;
    const model = ctx.models.users;
    const user = await model.getByUsername(username);
    if (password != user.password) {
        ctx.response.status = 403;
        ctx.response.body = {
            msg: "password is wrong",
        }
        return;
    }
    const token = generateAccessToken({
        id: user.id,
        username: user.username,
        role: user.role,
    });
    ctx.response.body = {
        msg: "login",
        data: {
            accessToken: token,
        }
    }
});

export default router;