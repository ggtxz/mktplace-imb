import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'ggtxz', // nome de usuário de banco
  host: 'localhost', 
  database: 'mktplace_imb',
  password: process.env.SQL_PASSWORD,
  port: 5432, // Porta padrão do PostgreSQL
});

export default pool;