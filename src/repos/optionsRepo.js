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

    static async updateOption(body, optionId){
        const query = `
        UPDATE options
        SET body = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2;
        `;
        const {rows} = await pool.query(query, [body, optionId]);
        return rows;
    }

    static async getOptionsByQuestionId(questionId){
        const query = `
        SELECT 
            o.id,
            o.created_at,
            o.updated_at,
            o.question_id,
            o.body,
            COUNT(c.id) as support
        FROM options o
        FULL JOIN choices c ON c.option_id = o.id
        WHERE question_id = $1
        GROUP BY 1,2,3,4,5;
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