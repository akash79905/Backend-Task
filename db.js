const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
    database: "bv80d0p031imtfqoy41z"
})

module.exports = pool;