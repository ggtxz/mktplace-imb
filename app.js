import express from 'express'

import usuarioRouter from './Routes/usuario.routes.js'

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rota
app.use('/usuario', usuarioRouter)


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})