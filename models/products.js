class Products {
    constructor(db) {
        this.db = db;
    }
    
    async getAll() {

    }

    async create(name, intro, price, stock, sid) {
        const query = `INSERT INTO products (name, intro, price, stock, sid) VALUES ("${name}", "${intro}", ${price}, ${stock}, ${sid})`;
        const { insertId } = await this.db.query(query);
        return await this.get(insertId);
    }
}