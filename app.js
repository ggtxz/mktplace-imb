const express = require('express');
const pool = require('./db/db');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rota para obter todos os usuários
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuario');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})