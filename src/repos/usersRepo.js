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
};

module.exports = UserRepo;