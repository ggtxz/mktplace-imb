const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mktplace_imb',
  password: '020922',
  port: 5432, // Porta padrão do PostgreSQL
});

module.exports = pool;