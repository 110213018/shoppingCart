import Router from "@koa/router";

const router = new Router();

// POST localhost/products/
router.post("/products/", async (ctx) => {
    const request = ctx.request.body;
    const name = request.name;
    const intro = request.intro;
    const price = request.price;
    const stock = request.stock;
    const sid = request.sid;
    const model = ctx.models.products;
    const product = await model.create(name, intro, price, stock, sid);
    ctx.status = 201;
    ctx.response.body = {
        msg: "Created",
        data: product,
    }
});

// GET localhost/products/
router.get("/products/", async (ctx) => {
    const request = ctx.request.body;
    const name = request.name;
    const intro = request.intro;
    const price = request.price;
    const stock = request.stock;
    const sid = request.sid;
    const model = ctx.models.products;
    const products = await model.getAll(name, intro, price, stock, sid);
    ctx.status = 200;
    ctx.response.body = {
        msg: "getAll",
        data: products,
    }
});

router.delete("/products/:id", async (ctx) => {
    const id = ctx.params.id;
    const model = ctx.models.products;
    await model.remove(id);
    ctx.status = 204;
});

export default router;