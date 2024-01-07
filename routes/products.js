import Router from "@koa/router";

const router = new Router();

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

export default router;