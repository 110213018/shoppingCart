class Carts {
    constructor(db) {
        this.db = db;
    }
    async create(productId, userId, quantity) {
        const query = `INSERT INTO carts (product_id, user_id, quantity) VALUES ( ${productId}, ${userId}, ${quantity})`;
        const { insertId } = await this.db.query(query);
        return await this.get(insertId);
    }
    async remove(id) {
        const query = `DELETE FROM carts WHERE id=${id}`;
        const result = await this.db.query(query);
        return result;
    }
    async get(id) {
        const query = `SELECT * FROM carts WHERE id = ${id}`;
        const result = await this.db.query(query);
        return result[0];
    }
    async getByUserId(userId) {
        const query = `SELECT * FROM carts WHERE user_id = ${userId}`;
        const result = await this.db.query(query);
        return result;
    }
    async removeByUserId(userId) {
        const query = `DELETE FROM carts WHERE user_id=${userId}`;
        const result = await this.db.query(query);
        return result;
    }
}


export default Carts;