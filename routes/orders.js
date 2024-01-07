import Router from "@koa/router";

const router = new Router();

// POST localhost/products/
router.get("/orders/", async (ctx) => {
    const role = ctx.request.query.role;
    const userId = ctx.request.query.userId;
    const model = ctx.models.orders;
    const orders = await model.getAll(role, userId);
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
    const model = ctx.models.orders;
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
    const star = request.star;
    let edit;
    if (status){
        const model = ctx.models.orders;
        edit = await model.editStatus(oid, status);
    }

    if (star){
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