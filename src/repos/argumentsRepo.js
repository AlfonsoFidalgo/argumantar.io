const pool = require('../pool');


class ArgumentsRepo {
    static async getArgumentsByOptionId(optionId){
        const query = `
        SELECT * FROM arguments WHERE option_id = $1;
        `;
        const {rows} = await pool.query(query, [optionId]);
        return rows;
    }

    static async postArgument(body, userId, optionId){
        const query = `
        INSERT INTO arguments (body, user_id, option_id)
        VALUES ($1, $2, $3);
        `;
        const {rows} = await pool.query(query, [body, userId, optionId]);
        return rows;
    }
}

module.exports = ArgumentsRepo;