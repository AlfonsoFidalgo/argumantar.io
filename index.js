const app = require('./src/app');
const pool = require('./src/pool');

pool.connect({
    host: 'localhost',
    port: 5432,
    database: 'argumentario',
    user: 'alfonso.fidalgo',
    password: ''
})
.then(() => {
    app().listen(3001, () => console.log('app running on 3001'));
})
.catch(e => console.log(e));
