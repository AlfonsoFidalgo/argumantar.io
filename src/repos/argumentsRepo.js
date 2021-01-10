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

    static async getArgumentById(id){
        const query = `
        SELECT * FROM arguments WHERE id = $1;
        `;
        const {rows} = await pool.query(query, [id]);
        return rows;
    }

    static async deleteArgument(id){
        const query = `
        DELETE FROM arguments WHERE id = $1
        `;
        const {rows} = await pool.query(query, [id]);
        return rows;
    }

    static async updateArgument(body, id){
        const query = `
        UPDATE arguments
        SET body = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        `;
        const {rows} = await pool.query(query, [body, id]);
        return rows;
    }
}

module.exports = ArgumentsRepo;