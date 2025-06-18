const knex = require('knex');
const config  = require('./config/configuration');

//conexión con la db
const db = knex({
    client: 'mysql',
    connection: {
        host: config.db.host,
        port: config.db.port,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
    },
    useNullAsDefault: true
})


module.exports = db;