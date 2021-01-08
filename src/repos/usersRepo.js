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

    static async findUserByUsername(username){
        const query = `
        SELECT * FROM users WHERE username = $1;
        `;
        const {rows} = await pool.query(query, [username]);
        return rows;
    }

    static async auth(user, providedPassword){
        const isEqual = await bcrypt.compare(providedPassword, user.password);
        return isEqual;
    }
};

module.exports = UserRepo;