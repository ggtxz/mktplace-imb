import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import usuarioRouter from './Routes/usuario.routes.js'
import imobiliariaRouter from './Routes/imobiliaria.routes.js'

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rota
app.use('/usuario', usuarioRouter)
app.use('/imobiliaria', imobiliariaRouter)


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})