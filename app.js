import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import usuarioRouter from './Routes/usuario.routes.js'
import imobiliariaRouter from './Routes/imobiliaria.routes.js'
import corretorRouter from './Routes/corretor.routes.js'
import imovelRouter from './Routes/imovel.routes.js'
import enderecoRouter from './Routes/endereco.routes.js'

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rotas
app.use('/usuario', usuarioRouter)
app.use('/imobiliaria', imobiliariaRouter)
app.use('/corretor', corretorRouter)
app.use('/imovel', imovelRouter)
app.use('/endereco', enderecoRouter)

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})