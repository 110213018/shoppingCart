class Carts {
    constructor(db) {
        this.db = db;
    }
    
    // 加入購物車
    async create(productId, userId, quantity) {
        const query = `INSERT INTO carts (product_id, user_id, quantity) VALUES ( ${productId}, ${userId}, ${quantity})`;
        const { insertId } = await this.db.query(query);
        return await this.get(insertId);
    }

    // 從購物車中移除
    async remove(id) {
        const query = `DELETE FROM carts WHERE id=${id}`;
        const result = await this.db.query(query);
        return result;
    }

    // 購物車清單
    async get(id) {
        const query = `SELECT * FROM carts WHERE id = ${id}`;
        const result = await this.db.query(query);
        return result[0];
    }

    // 買家購物車清單
    async getByUserId(userId) {
        const query = `SELECT * FROM carts WHERE user_id = ${userId}`;
        const result = await this.db.query(query);
        return result;
    }

    // 清空買家購物車清單
    async removeByUserId(userId) {
        const query = `DELETE FROM carts WHERE user_id=${userId}`;
        const result = await this.db.query(query);
        return result;
    }
}


export default Carts;