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
}

module.exports = OptionsRepo;