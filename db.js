const { Pool } = require('pg');

const pool = new Pool({
  user: 'postres',
  host: 'localhost',
  database: 'malawi_blog',
  password: '',
  port: 5432,
});

module.exports = pool;