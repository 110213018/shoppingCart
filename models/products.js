class Products {
    constructor(db) {
        this.db = db;
    }
    
    async getAll() {
        const query = `SELECT * FROM products`;
        const result = await this.db.query(query);
        return result;
    }

    async create(name, intro, price, stock, sid) {
        const query = `INSERT INTO products (name, intro, price, stock, sid) VALUES ("${name}", "${intro}", ${price}, ${stock}, ${sid})`;
        const { insertId } = await this.db.query(query);
        return await this.get(insertId);
    }

    async edit(name, intro, price, stock, sid) {
        const query = `UPDATE products SET name="${name}", intro="${intro}", price=${price}, stock=${stock}, sid=${sid})`;
        const { insertId } = await this.db.query(query);
        return await this.get(insertId);
    }
}