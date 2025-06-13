const knex= require('knex');

//conexión con la db
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'boardgames.db'
    },
    useNullAsDefault: true
})

module.exports = db;