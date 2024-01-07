class Products {
    constructor(db) {
        this.db = db;
    }
    // 商品清單
    async getAll() {
        const query = `SELECT * FROM products`;
        const result = await this.db.query(query);
        return result;
    }
    // 新增商品
    async create(name, intro, price, stock, sid) {
        const query = `INSERT INTO products (name, intro, price, stock, sid) VALUES ("${name}", "${intro}", ${price}, ${stock}, ${sid})`;
        const { insertId } = await this.db.query(query);
        return await this.get(insertId);
    }
    // 編輯商品
    async edit(id, name, intro, price, stock, sid) {
        const query = `UPDATE products SET name="${name}", intro="${intro}", price=${price}, stock=${stock}, sid=${sid} WHERE id=${id}`;
        await this.db.query(query);
        return await this.get(id);
    }

    async remove(id) {
        const query = `DELETE FROM products WHERE id=${id}`;
        const result = await this.db.query(query);
        return result;
    }

    async getByName(name) {
        const query = `SELECT * FROM products WHERE name = "${name}"`;
        const result = await this.db.query(query);
        return result[0];
    }

    async get(id) {
        const query = `SELECT * FROM products WHERE id = "${id}"`;
        const result = await this.db.query(query);
        return result[0];
    }
}

export default Products;