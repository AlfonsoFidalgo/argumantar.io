const pool = require('../pool');

class QuestionRepo {
    static async fetchAll(){
        const query = `
        select * from questions;
        `;
        const { rows } = await pool.query(query);
        return rows;
    }
};

module.exports = QuestionRepo;