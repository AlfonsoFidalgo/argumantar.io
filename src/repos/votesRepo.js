const pool = require('../pool');

class VotesRepo {
    static async postArgumentVote(argumentId, userId, voteType){
        const query = `
        INSERT INTO votes (argument_id, user_id, v_type)
        VALUES ($1, $2, $3);
        `;
        const {rows} = await pool.query(query, [argumentId, userId, voteType]);
        return rows;
    }

    static async postCommentVote(commentId, userId, voteType){
        const query = `
        INSERT INTO votes (comment_id, user_id, v_type)
        VALUES ($1, $2, $3);
        `;
        const {rows} = await pool.query(query, [commentId, userId, voteType]);
        return rows;
    }

    static async checkUserCommentVote(userId, commentId){
        const query = `
        SELECT * FROM votes WHERE user_id = $1 AND comment_id = $2;
        `;
        const {rows} = await pool.query(query, [userId, commentId]);
        return rows;
    }

    static async checkUserArgumentVote(userId, argumentId){
        const query = `
        SELECT * FROM votes WHERE user_id = $1 AND argument_id = $2;
        `;
        const {rows} = await pool.query(query, [userId, argumentId]);
        return rows;
    }

    static async updateArgumentVote(vType, userId, argumentId){
        const query = `
        UPDATE votes
        SET v_type = $1
        WHERE user_id = $2 AND argument_id = $3;
        `;
        const {rows} = await pool.query(query, [vType, userId, argumentId]);
        return rows;
    }

    static async updateCommentVote(vType, userId, commentId){
        const query = `
        UPDATE votes
        SET v_type = $1
        WHERE user_id = $2 AND comment_id = $3;
        `;
        const {rows} = await pool.query(query, [vType, userId, commentId]);
        return rows;
    }

    static async deleteArgumentVote(userId, argumentId){
        const query = `
        DELETE FROM votes
        WHERE user_id = $1 AND argument_id = $2;
        `;
        const {rowCount} = await pool.query(query, [userId, argumentId]);
        return rowCount;
    }

    static async deleteCommentVote(userId, commentId){
        const query = `
        DELETE FROM votes
        WHERE user_id = $1 AND comment_id = $2;
        `;
        const {rowCount} = await pool.query(query, [userId, commentId]);
        return rowCount;
    }

}

module.exports = VotesRepo;