import Router from "@koa/router";

import auth from "../middleware/auth.js";

const router = new Router();

// POST localhost/carts/
router.post("/carts/", auth, async (ctx) => {
    const request = ctx.request.body;
    const productId = request.productId;
    const userId = ctx.state.user.id;
    const quantity = request.quantity;
    const model = ctx.models.carts;
    const cart = await model.create(productId, userId, quantity);
    ctx.status = 201;
    ctx.response.body = {
        msg: "Created",
        data: cart,
    }
});

// GET localhost/carts/
router.get("/carts/", auth, async (ctx) => {
    const userId = ctx.state.user.id;
    const model = ctx.models.carts;
    const carts = await model.getByUserId(userId);
    ctx.status = 200;
    ctx.response.body = {
        msg: "getAll",
        data: carts,
    }
});

// 購物車中移除
router.delete("/carts/:id", async (ctx) => {
    const id = ctx.params.id;
    const model = ctx.models.carts;
    await model.remove(id);
    ctx.status = 204;
});

// 送出後清空訂單
router.delete("/carts/", async (ctx) => {
    const userId = ctx.request.query["user_id"];
    const model = ctx.models.carts;
    await model.removeByUserId(userId);
    ctx.status = 204;
});


export default router;