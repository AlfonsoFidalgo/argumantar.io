const pool = require('../pool');

class OptionsRepo {
    static async postOption(attr){
        const query = `
        INSERT INTO options (question_id, body)
        VALUES ($1, $2);
        `;
        const {rows} = await pool.query(query, [attr.questionId, attr.body]);
        return rows;
    }

    static async getOptionsByQuestionId(questionId){
        const query = `
        SELECT * FROM options WHERE question_id = $1;
        `;
        const {rows} = await pool.query(query, [questionId]);
        return rows;
    }

    static async getOptionById(id){
        const query = `
        SELECT * FROM options WHERE id = $1;
        `;
        const {rows} = await pool.query(query, [id]);
        return rows;
    }
}

module.exports = OptionsRepo;