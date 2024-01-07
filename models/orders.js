class Orders {
    constructor(db) {
        this.db = db;
    }
    // 客戶訂單
    async getAll(role, userId) {
        let query;
        if (role==1){
            query = `SELECT * FROM orders WHERE sid=${userId}`;
        }
        if (role==2){
            query = `SELECT * FROM orders WHERE uid=${userId}`;
        }
        const result = await this.db.query(query);
        return result;
    }

    // async getAllByBlackCat() {
        // const query = `SELECT * FROM orders WHERE status="以寄送"`;
        // const result = await this.db.query(query);
        // return result;
    // }

    async create(sid, uid, orderdata, status) {
        const query = `INSERT INTO orders (sid, uid, orderdata, status, star) VALUES (${sid}, ${uid}, "${orderdata}", "${status}", 0)`;
        const { insertId } = await this.db.query(query);
        return await this.get(insertId);
    }

    // 更新狀態
    async editStatus(oid, status) {
        const query = `UPDATE orders SET status="${status}" WHERE oid=${oid}`;
        await this.db.query(query);
        return await this.get(oid);
    }

    // 更新評價
    async editStar(oid, star) {
        const query = `UPDATE orders SET star="${star}" WHERE oid=${oid}`;
        await this.db.query(query);
        return await this.get(oid);
    }

    async get(oid) {
        const query = `SELECT * FROM orders WHERE oid = "${oid}"`;
        const result = await this.db.query(query);
        return result[0];
    }
}

export default Orders;