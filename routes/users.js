import Router from "@koa/router";

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

export default router;