const pool = require('../pool');


class ArgumentsRepo {
    static async getArgumentsByOptionId(optionId){
        const query = `
        SELECT * FROM arguments WHERE option_id = $1;
        `;
        const {rows} = await pool.query(query, [optionId]);
        return rows;
    }

    static async getArgumentsByQuestionId(questionId){
        const query = `
        SELECT
            q.id as question_id,
            o.body as option_body,
            o.id as option_id,
            a.body as argument_body,
            a.id as argument_id,
            a.created_at as argument_date,
            u.username as argument_username,
            u.display_name as argument_dname,
            (select count(id) from votes where v_type = 'upvote' and argument_id = a.id) as upvotes,
            (select count(id) from votes where v_type = 'downvote' and argument_id = a.id) as downvotes
        FROM questions q
        JOIN options o ON o.question_id = q.id
        JOIN arguments a ON a.option_id = o.id
        JOIN users u ON u.id = a.user_id
        WHERE q.id = $1
        ORDER BY upvotes DESC, argument_date DESC;
        `;
        const {rows} = await pool.query(query, [questionId]);
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

    static async deleteArgumentAfterChoice(optionId, userId){
        const query = `
        DELETE from arguments WHERE option_id = $1 AND user_id = $2;
        `;
        const {rows} = await pool.query(query, [optionId, userId]);
        return rows;
    }
}

module.exports = ArgumentsRepo;