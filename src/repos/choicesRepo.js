const pool = require('../pool');


class ChoicesRepo {
    static async checkEligibility(optionId, userId){
        const query = `
        SELECT * FROM choices WHERE option_id = $1 AND user_id = $2;
        `;
        const {rows} = await pool.query(query, [optionId, userId]);
        return rows;
    }

    static async postChoice(optionId, userId){
        const query = `
        INSERT INTO choices (option_id, user_id)
        VALUES ($1, $2) RETURNING *;
        `;
        const {rows} = await pool.query(query, [optionId, userId]);
        return rows;
    }

    static async deleteChoice(choiceId){
        const query = `
        DELETE FROM choices WHERE id = $1 RETURNING *;
        `;
        const {rows} = await pool.query(query, [choiceId]);
        return rows;
    }

    static async getChoice(choiceId){
        const query = `
        SELECT * FROM choices WHERE id = $1;
        `;
        const {rows} = await pool.query(query, [choiceId]);
        return rows;
    }
}

module.exports = ChoicesRepo;