import Router from "@koa/router";

const router = new Router();

// POST localhost/products/
router.post("/carts/", async (ctx) => {
    const request = ctx.request.body;
    const productId = request.productId;
    const userId = request.userId;
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
router.get("/carts/", async (ctx) => {
    const userId = ctx.request.query["user_id"];
    const model = ctx.models.carts;
    const carts = await model.getByUserId(userId);
    ctx.status = 200;
    ctx.response.body = {
        msg: "getAll",
        data: carts,
    }
});

router.delete("/carts/:id", async (ctx) => {
    const id = ctx.params.id;
    const model = ctx.models.carts;
    await model.remove(id);
    ctx.status = 204;
});

router.delete("/carts/", async (ctx) => {
    const userId = ctx.request.query["user_id"];
    const model = ctx.models.carts;
    await model.removeByUserId(userId);
    ctx.status = 204;
});


export default router;