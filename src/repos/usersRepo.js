const pool = require('../pool');
const bcrypt = require('bcryptjs');

class UserRepo {
    static async signup(user){
        const query = `
        INSERT INTO users (username, email, password, display_name, bio)
        VALUES ($1, $2, $3, $4, $5);
        `;

        const hashedPw = await bcrypt.hash(user.password, 12);

        const {rowCount} = await pool.query(query, 
            [user.username,
             user.email, 
             hashedPw, 
             user.displayName, 
             user.bio
            ]);
        return rowCount;
    }

    static async findUser(email){
        const query = `
        SELECT * FROM users WHERE email = $1;
        `;
        const {rows} = await pool.query(query, [email]);
        return rows;
    }

    static async fetchChoices(userId){
        const query = `
        SELECT 
            id, created_at, option_id
        FROM choices WHERE user_id = $1;
        `;
        const {rows} = await pool.query(query, [userId]);
        return rows
    }

    static async fetchVotes(userId){
        const query = `
        SELECT
            id,
            created_at,
            argument_id,
            comment_id,
            v_type
        FROM votes
        WHERE user_id = $1;
        `;
        const {rows} = await pool.query(query, [userId]);
        return rows;
    }

    static async findUserByUsername(username){
        const query = `
        SELECT * FROM users WHERE username = $1;
        `;
        const {rows} = await pool.query(query, [username]);
        return rows;
    }

    static async findUserById(id){
        const query = `
        SELECT * FROM users WHERE id = $1;
        `;
        const {rows} = await pool.query(query, [id]);
        return rows;
    }

    static async auth(user, providedPassword){
        const isEqual = await bcrypt.compare(providedPassword, user.password);
        return isEqual;
    }

    static async updateUser(displayName, bio, id){
        const query = `
        UPDATE users
        SET display_name = $1, bio = $2, updated_at = CURRENT_TIMESTAMP
        WHERE id = $3;
        `;
        const {rows} = await pool.query(query, [displayName, bio, id]);
        return rows;
    }

    static async deleteUser(id){
        const query = `
        DELETE FROM users
        WHERE id = $1;
        `;
        const {rows} = await pool.query(query, [id]);
        return rows;
    }
};

module.exports = UserRepo;