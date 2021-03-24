const app = require('./src/app');
const pool = require('./src/pool');

const PORT = process.env.PORT || 3001;

pool.connect({
    host: 'localhost',
    port: 5432,
    database: 'argumentario',
    user: 'alfonso.fidalgo',
    password: ''
})
.then(() => {
    app().listen(PORT, () => console.log(`app running on ${PORT}`));
})
.catch(e => console.log(e));
