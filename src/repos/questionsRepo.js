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
                    u.username,
                    u.display_name
                FROM questions q
                JOIN users u ON u.id = q.user_id
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
            agree_options as 
            (
                select 
                     o.question_id,
                     o.id as agree_option_id,
                     count(c.id) as agree_votes
                from options o
                full join choices c ON c.option_id = o.id
                where body = 'Agree'
                group by 1,2
            ),
            disagree_options as
            (
                select 
                     o.question_id,
                     o.id as disagree_option_id,
                     count(c.id) as disagree_votes
                from options o
                full join choices c ON c.option_id = o.id
                where body = 'Disagree'
                group by 1,2
            )
        SELECT 
        q.question_id,
        q.created_at,
        q.question_title,
        q.question_body,
        q.username,
        q.display_name,
        COALESCE(a.num_arguments, 0) as num_arguments,
        aop.agree_option_id,
        aop.agree_votes,
        dop.disagree_option_id,
        dop.disagree_votes
        FROM questions_ q
        JOIN agree_options aop ON aop.question_id = q.question_id
        JOIN disagree_options dop ON dop.question_id = q.question_id
        FULL JOIN arguments_ a ON a.question_id = q.question_id
        ORDER BY num_arguments DESC, q.created_at DESC;
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
                    u.username,
                    u.display_name
                FROM questions q
                JOIN users u ON u.id = q.user_id
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
            agree_options as 
            (
                select 
                     o.question_id,
                     o.id as agree_option_id,
                     count(c.id) as agree_votes
                from options o
                full join choices c ON c.option_id = o.id
                where body = 'Agree'
                group by 1,2
            ),
            disagree_options as
            (
                select 
                     o.question_id,
                     o.id as disagree_option_id,
                     count(c.id) as disagree_votes
                from options o
                full join choices c ON c.option_id = o.id
                where body = 'Disagree'
                group by 1,2
            )
        SELECT 
        q.question_id,
        q.created_at,
        q.question_title,
        q.question_body,
        q.username,
        q.display_name,
        COALESCE(a.num_arguments, 0) as num_arguments,
        aop.agree_option_id,
        aop.agree_votes,
        dop.disagree_option_id,
        dop.disagree_votes
        FROM questions_ q
        JOIN agree_options aop ON aop.question_id = q.question_id
        JOIN disagree_options dop ON dop.question_id = q.question_id
        FULL JOIN arguments_ a ON a.question_id = q.question_id
        WHERE q.question_id = $1
        `;
        const { rows } = await pool.query(query, [id]);
        return rows;
    }
};

module.exports = QuestionRepo;