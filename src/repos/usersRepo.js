const pool = require('../pool');

class UserRepo {
    static async createUser(attr){
        const query = `
        INSERT INTO users (username, email, password, display_name, bio, avatar)
        VALUES ($1, $2, $3, $4, $5, $6);
        `;
        await pool.query(query, 
            [attr.username,
             attr.email, 
             attr.password, 
             attr.display_name, 
             attr.bio, 
             attr.avatar]);
        return;
    }
};

module.exports = UserRepo;