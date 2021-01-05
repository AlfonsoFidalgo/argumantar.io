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
    app().listen(3000, () => console.log('app running on 3000'));
})
.catch(e => console.log(e));
