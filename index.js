const app = require('./src/app');
const pool = require('./src/pool');

const PORT = process.env.PORT || 3001;

pool.connect({
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5432,
    database: process.env.DATABASE || 'argumentario',
    user: process.env.DATABASE_USER || 'alfonso.fidalgo',
    password: process.env.DATABASE_PASSWORD || '',
    ssl: true
})
.then(() => {
    app().listen(PORT, () => console.log(`app running on ${PORT}`));
})
.catch(e => console.log(e));
