import pool from '../db/db.js'


// Create
export const criarCorretor = async (req, res) => {
    try{
        const {independente, imobiliaria_idimobiliaria, usuario_idusuario} = req.body
        const cadastro = await pool.query(
            `INSERT INTO corretor (independente, imobiliaria_idimobiliaria, usuario_idusuario) 
            VALUES ($1, $2, $3) 
            RETURNING *`, 
            [independente, imobiliaria_idimobiliaria, usuario_idusuario]);

        const novoCorretor = cadastro.rows[0];

        res.json({
            data: novoCorretor,
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
        const result = await pool.query(
            `SELECT * 
            FROM corretor`);

        res.json(result.rows);
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao obter corretores');
    }
}

export const getCorretorPorId = async (req, res) => {
    try{
        const id = req.params.corretorId;
        // verifica se o id é válido
        if(!isNaN(id)){
            const corretor = await pool.query(
                `SELECT * 
                FROM corretor 
                WHERE id=$1`, 
                [id]);

            if(corretor.rowCount > 0){
                res.json(corretor.rows);
            }
            else{
                res.status(400).json("Corretor não encontrado")
            }
        }
        else{
            res.status(400).json("Id de corretor inválido");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao obter corretor');
    }    
}

// Update
export const atualizarCorretor = async (req, res) => {
    try{
        const { independente, imobiliaria_idimobiliaria } = req.body;
        const id = req.params.corretorId;
        // verifica se o id é válido
        if(!isNaN(id)){
            const corretor = await pool.query(
                `UPDATE corretor 
                SET independente=$1, imobiliaria_idimobiliaria=$2 
                WHERE id=$3
                RETURNING *`, 
                [independente, imobiliaria_idimobiliaria, id]);

            const attCorretor = corretor.rows[0]

            if(corretor.rowCount > 0){
                res.json({
                    msg: "Corretor atualizado com sucesso",
                    corretor: attCorretor
                });
            }
            else{
                res.status(400).json("Corretor não encontrado")
            }
        }
        else{
            res.status(400).json("Id de corretor inválido");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao atualizar corretor');
    }    
}

// Delete
export const deletarCorretor = async (req, res) => {
    try{
        const id = Number(req.params.corretorId);
        // verifica se o id é válido
        if (!isNaN(id)) {

            const result = await pool.query(
                `DELETE 
                FROM corretor 
                WHERE id=$1`, 
                [id]);
                
            if (result.rowCount > 0) {
                res.json("Corretor deletado com sucesso");
            } 
            else {
                res.status(404).json("corretor não encontrada");
            }
          } 
        else {
            res.status(400).json("Id de corretor inválido");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao deletar corretor');
    }    
}