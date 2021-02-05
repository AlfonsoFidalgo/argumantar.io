const pool = require('../pool');

class QuestionRepo {
    static async getQuestions(){
        const query = `
        WITH 
        questions_ as
        (
            SELECT
                q.id as question_id,
                q.created_at,
                q.updated_at,
                q.title as question_title,
                q.body as question_body,
                u.username
            FROM questions q
            JOIN users u ON u.id = q.user_id
        ), 
        question_engagement as
        (
            SELECT 
                o.question_id,
                COUNT(c.id) as question_engagement
            FROM options o
            FULL JOIN choices c ON c.option_id = o.id
            GROUP BY 1
        ),
        arguments_ as
        (
            SELECT 
            o.question_id,
            count(a.id) as num_arguments
            FROM options o
            JOIN arguments a ON a.option_id = o.id
            GROUP BY 1
        ),
        options_ as 
        (
            SELECT 
                o.id as option_id,
                o.created_at,
                o.updated_at,
                o.question_id,
                o.body as option_body,
                COUNT(c.id) as support
            FROM options o
            
            FULL JOIN choices c ON c.option_id = o.id
            GROUP BY 1,2,3,4,5
        )
        SELECT 
        q.question_id,
        q.created_at,
        q.question_title,
        q.question_body,
        q.username,
        o.support as agree_support,
        qe.question_engagement,
        COALESCE(a.num_arguments, 0) as num_arguments
        FROM questions_ q
        JOIN options_ o ON o.question_id = q.question_id
        JOIN question_engagement qe ON qe.question_id = q.question_id
        FULL JOIN arguments_ a ON a.question_id = q.question_id
        WHERE o.option_body = 'Agree'
        ORDER BY q.created_at DESC;
        `;
        const { rows } = await pool.query(query);
        return rows;
    }

    static async deleteQuestion(id){
        const query = `
        DELETE FROM questions WHERE id = $1;
        `;
        const {rowCount} = await pool.query(query, [id]);
        return rowCount;
    }

    static async postQuestion(attr){
        const query = `
        INSERT INTO questions (user_id, title, body)
        VALUES ($1, $2, $3) RETURNING *;
        `;
        const {rows} = await pool.query(query, [attr.user_id, attr.title, attr.body]);
        return rows[0];
    }

    static async updateQuestion(body, title, id){
        const query = `
        UPDATE questions
        SET body = $1, title = $2, updated_at = CURRENT_TIMESTAMP
        WHERE id = $3;
        `;
        const {rowCount} = await pool.query(query, [body, title, id]);
        return rowCount;
    }

    static async getQuestionById(id){
        const query = `
        WITH 
        questions_ as
        (
            SELECT
                q.id as question_id,
                q.created_at,
                q.updated_at,
                q.title as question_title,
                q.body as question_body,
                u.username
            FROM questions q
            JOIN users u ON u.id = q.user_id
        ), 
        question_engagement as
        (
            SELECT 
                o.question_id,
                COUNT(c.id) as question_engagement
            FROM options o
            FULL JOIN choices c ON c.option_id = o.id
            GROUP BY 1
        ),
        arguments_ as
        (
            SELECT 
            o.question_id,
            count(a.id) as num_arguments
            FROM options o
            JOIN arguments a ON a.option_id = o.id
            GROUP BY 1
        ),
        options_ as 
        (
            SELECT 
                o.id as option_id,
                o.created_at,
                o.updated_at,
                o.question_id,
                o.body as option_body,
                COUNT(c.id) as support
            FROM options o
            
            FULL JOIN choices c ON c.option_id = o.id
            GROUP BY 1,2,3,4,5
        )
        SELECT 
        q.question_id,
        q.created_at,
        q.question_title,
        q.question_body,
        q.username,
        o.support as agree_support,
        qe.question_engagement,
        COALESCE(a.num_arguments, 0) as num_arguments
        FROM questions_ q
        JOIN options_ o ON o.question_id = q.question_id
        JOIN question_engagement qe ON qe.question_id = q.question_id
        FULL JOIN arguments_ a ON a.question_id = q.question_id
        WHERE o.option_body = 'Agree'
        AND q.question_id = $1;
        `;
        const { rows } = await pool.query(query, [id]);
        return rows;
    }
};

module.exports = QuestionRepo;