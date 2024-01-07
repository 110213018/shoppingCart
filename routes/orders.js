import Router from "@koa/router";

const router = new Router();

// POST localhost/products/
router.get("/orders/", async (ctx) => {
    const request = ctx.request.body;
    const role = request.role;
    const model = ctx.models.orders;
    const orders = await model.getAll(role);
    ctx.status = 200;
    ctx.response.body = {
        msg: "getAll",
        data: orders,
    }
});

router.post("/orders/", async (ctx) => {
    const request = ctx.request.body;
    const sid = request.sid;
    const uid = request.uid;
    const orderdata = request.orderdata;
    const status = request.status;
    const model = ctx.models.products;
    const orders = await model.create(sid, uid, orderdata, status);
    ctx.status = 201;
    ctx.response.body = {
        msg: "Created",
        data: orders,
    }
});

router.put("/orders/:oid", async (ctx) => {
    const request = ctx.request.body;
    const oid = ctx.params.oid;
    const status = request.status;
    let edit;
    if (request.status){
        const model = ctx.models.orders;
        edit = await model.editStatus(oid, status);
    }

    if (request.star){
        const model = ctx.models.orders;
        edit = await model.editStar(oid, star);
    }
    ctx.status = 200;
    ctx.response.body = {
        msg: "update",
        data: edit,
    }
});

export default router;