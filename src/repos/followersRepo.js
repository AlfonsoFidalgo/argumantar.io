const pool = require('../pool');


class FollowersRepo {
    static async followUser(leaderId, followerId){
        const query = `
        INSERT INTO followers (leader_id, follower_id)
        VALUES ($1, $2);
        `;
        const {rows} = await pool.query(query, [leaderId, followerId]);
        return rows;
    }

    static async unfollowUser(leaderId, followerId){
        const query = `
        DELETE FROM followers
        WHERE leader_id = $1 AND follower_id = $2;
        `;
        const {rows} = await pool.query(query, [leaderId, followerId]);
        return rows;
    }

    static async checkFollowerElegibility(leaderId, followerId){
        const query = `
        SELECT * FROM followers WHERE leader_id = $1 AND follower_id = $2;
        `;
        const {rows} = await pool.query(query, [leaderId, followerId]);
        return rows;
    }
}

module.exports = FollowersRepo;