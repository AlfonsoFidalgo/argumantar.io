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
};

module.exports = CommentsRepo;
