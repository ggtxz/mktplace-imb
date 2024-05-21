import jwt from 'jsonwebtoken'

export default function autorizarUsuario(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]

    if(authHeader && token){
        jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
            if(err){
                return res.status(401).json({
                    msg: "Você precisa estar logado para acessar esse recurso"
                })
            }

            next()
        })
    }
    else{
        res.status(401).json({
            msg: "Você precisa estar logado para acessar esse recurso"
        })
    }
}