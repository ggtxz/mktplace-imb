import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'ggtxz',
  host: 'localhost',
  database: 'mktplace_imb',
  password: '020922',
  port: 5432, // Porta padrão do PostgreSQL
});

export default pool;