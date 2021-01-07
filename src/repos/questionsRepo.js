const pool = require('../pool');

class QuestionRepo {
    static async getQuestions(){
        const query = `
        select * from questions;
        `;
        const { rows } = await pool.query(query);
        return rows;
    }

    static async postQuestion(attr){
        const query = `
        INSERT INTO questions (user_id, title, body, url)
        VALUES ($1, $2, $3, $4);
        `;
        await pool.query(query, [attr.user_id, attr.title, attr.body, attr.url]);
        return;
    }
};

module.exports = QuestionRepo;