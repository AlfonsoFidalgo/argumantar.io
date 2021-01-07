const pool = require('../pool');

class QuestionRepo {
    static async getQuestions(){
        const query = `
        select * from questions;
        `;
        const { rows } = await pool.query(query);
        return rows;
    }

    static async deleteQuestion(id){
        const query = `
        DELETE FROM questions WHERE id = $1;
        `;
        const {rowCount} = await pool.query(query, [id]);
        return rowCount;
    }

    static async postQuestion(attr){
        const query = `
        INSERT INTO questions (user_id, title, body)
        VALUES ($1, $2, $3);
        `;
        const {rowCount} = await pool.query(query, [attr.user_id, attr.title, attr.body]);
        return rowCount;
    }

    static async updateQuestion(body, title, id){
        const query = `
        UPDATE questions
        SET body = $1, title = $2
        WHERE id = $3;
        `;
        const {rowCount} = await pool.query(query, [body, title, id]);
        return rowCount;
    }

    static async getQuestionById(id){
        const query = `
        SELECT * FROM questions WHERE id = $1;
        `;
        const { rows } = await pool.query(query, [id]);
        return rows;
    }
};

module.exports = QuestionRepo;