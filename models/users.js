class Users {
    constructor(db) {
        /**
         * 
         */
        this.db = db;
    }

    async get(id) {
        const query = `SELECT * FROM users WHERE id = ${id}`;
        const result = await this.db.query(query);
        return result[0];
    }

    async getByUsername(username) {
        const query = `SELECT * FROM users WHERE username = ${username}`;
        const result = await this.db.query(query);
        return result[0];
    }

    async create(username, password, role) {
        const query = `INSERT INTO users (username, password, role) VALUES ("${username}", "${password}", ${role})`;
        const { insertId } = await this.db.query(query);
        return await this.get(insertId);
    }
}

export default Users;