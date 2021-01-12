const pool = require('../pool');

class CommentsRepo {
    static async postComment(commentBody, userId, argumentId){
        const query = `
        INSERT INTO comments (body, user_id, argument_id)
        VALUES ($1, $2, $3);
        `;
        const {rows} = await pool.query(query, [commentBody, userId, argumentId]);
        return rows;
    }

    static async getComments(argumentId){
        const query = `
        SELECT * FROM comments WHERE argument_id = $1;
        `;
        const {rows} = await pool.query(query, [argumentId]);
        return rows;
    }

    static async getComment(commentId){
        const query = `
        SELECT * FROM comments WHERE id = $1;
        `;
        const {rows} = await pool.query(query, [commentId]);
        return rows;
    }

    static async deleteComment(commentId){
        const query = `
        DELETE FROM comments WHERE id = $1;
        `;
        const {rows} = await pool.query(query, [commentId]);
        return rows;
    }
};

module.exports = CommentsRepo;