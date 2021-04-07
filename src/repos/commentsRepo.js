const pool = require('../pool');

class CommentsRepo {
    static async postComment(commentBody, userId, argumentId){
        const query = `
        INSERT INTO comments (body, user_id, argument_id)
        VALUES ($1, $2, $3) RETURNING *;
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

    static async getCommentsByQuestionId(questionId){
        const query = `
        SELECT
        c.id,
        c.created_at,
        c.updated_at,
        c.argument_id,
        c.body,
        u.username
        FROM comments c
        JOIN users u ON u.id = c.user_id
        WHERE argument_id IN (
            SELECT 
            id
            FROM arguments 
            WHERE option_id IN (
                SELECT 
                id
                FROM options
                WHERE question_id = $1
            )
        );`;
        const {rows} = await pool.query(query, [questionId]);
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

    static async updateComment(commentId, commentBody){
        const query = `
        UPDATE comments
        SET body = $2
        WHERE id = $1;
        `;
        const {rows} = await pool.query(query, [commentId, commentBody]);
        return rows;
    }
};

module.exports = CommentsRepo;
