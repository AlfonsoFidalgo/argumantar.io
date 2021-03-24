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
    app().listen(PORT, () => console.log('app running on 3001'));
})
.catch(e => console.log(e));
