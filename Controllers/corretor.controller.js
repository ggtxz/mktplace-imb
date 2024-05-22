import pool from '../db/db.js'


// Create
export const criarcorretor = async (req, res) => {
    try{
        // transformar id usuario em unique
        const {independente, imobiliaria_idimobiliaria, usuario_idusuario} = req.body
        const cadastro = await pool.query(`INSERT INTO corretor (independente, imobiliaria_idimobiliaria, usuario_idusuario) VALUES ($1, $2, $3)`, [independente, imobiliaria_idimobiliaria, usuario_idusuario]);
        const corretor = await pool.query(
            `SELECT * FROM corretor WHERE usuario_idusuario=$1`, [usuario_idusuario] 
        )

        const token = gerarToken(corretor.rows[0])
        res.json({
            data: corretor.rows[0],
            token: token,
            msg: "Corretor cadastrado com sucesso"
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao criar corretor');
    }
}

// Read
export const getCorretores = async (req, res) => {
    try{

    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao obter corretores');
    }
}

export const getCorretorPorId = async (req, res) => {
    try{

    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao obter corretor');
    }    
}

// Update
export const atualizarCorretor = async (req, res) => {
    try{

    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao atualizar corretor');
    }    
}

// Delete
export const deletarCorretor = async (req, res) => {
    try{

    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao deletar corretor');
    }    
}