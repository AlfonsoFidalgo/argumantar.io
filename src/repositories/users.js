const pool = require('../pool');

class UserRepo {
    static async fetchAll(){
        const query = `
        select * from users;
        `;
        const { rows } = await pool.query(query);
        return rows;
    }
};

module.exports = UserRepo;