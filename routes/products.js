import Router from "@koa/router";
import auth from "../middleware/auth"; //驗證

const router = new Router();

// POST localhost/products/
router.post("/products/", auth, async (ctx) => {
    const request = ctx.request.body;
    const name = request.name;
    const intro = request.intro;
    const price = request.price;
    const stock = request.stock;
    const sid = ctx.state.user.id; //驗證sid的身分後，才可執行post的動作
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
    const model = ctx.models.products;
    const products = await model.getAll();
    ctx.status = 200;
    ctx.response.body = {
        msg: "getAll",
        data: products,
    }
});

// PUT localhost/products/
router.put("/products/:id", auth, async (ctx) => {
    const id = ctx.params.id;
    const request = ctx.request.body;
    const name = request.name;
    const intro = request.intro;
    const price = request.price;
    const stock = request.stock;
    const sid = ctx.state.user.id;
    const model = ctx.models.products;
    const product = await model.edit(id, name, intro, price, stock, sid);
    ctx.status = 200;
    ctx.response.body = {
        msg: "edit",
        data: product,
    }
});

router.delete("/products/:id", auth, async (ctx) => {
    const id = ctx.params.id;
    const model = ctx.models.products;
    await model.remove(id);
    ctx.status = 204;
});

export default router;