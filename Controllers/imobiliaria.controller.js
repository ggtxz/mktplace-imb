import pool from '../db/db.js'


// Create
export const criarImobiliaria = async (req, res) => {
    try{
        const { nome, usuario_idusuario } = req.body
        const cadastro = await pool.query(
            `INSERT INTO imobiliaria (nome, usuario_idusuario) 
            VALUES ($1, $2) 
            RETURNING *`, 
            [nome, usuario_idusuario]);

        const novaImb = cadastro.rows[0];

        res.json({
            data: novaImb,
            msg: "Imobiliaria cadastrado com sucesso"
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao criar imobiliaria, usuário já está associado a uma imobiliária');
    }
}

// Read
export const getImobiliarias = async (req, res) => {
    try{
        const result = await pool.query(
            `SELECT * 
            FROM imobiliaria`);

        res.json(result.rows);
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao obter imobiliarias');
    }
}

export const getImobiliariaPorId = async (req, res) => {
    try{
        const id = req.params.imobiliariaId;
        // verifica se o id é válido
        if(!isNaN(id)){
            const imobiliaria = await pool.query(
                `SELECT * 
                FROM imobiliaria 
                WHERE idimobiliaria=$1`, 
                [id]);

            if(imobiliaria.rowCount > 0){
                res.json(imobiliaria.rows);
            }
            else{
                res.status(400).json("Imobiliaria não encontrado")
            }
        }
        else{
            res.status(400).json("Id de imobiliaria inválido");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao obter imobiliaria');
    }    
}

// Update
export const atualizarImobiliaria = async (req, res) => {
    try{
        const { nome } = req.body;
        const id = req.params.imobiliariaId;
        // verifica se o id é válido
        if(!isNaN(id)){
            const imobiliaria = await pool.query(
                `UPDATE imobiliaria 
                SET nome=$1 
                WHERE idimobiliaria=$2 
                RETURNING *`, 
                [nome, id]);

            const attImobiliaria = imobiliaria.rows[0]

            if(imobiliaria.rowCount > 0){
                res.json({
                    msg: "Imobiliária atualizado com sucesso",
                    imobiliaria: attImobiliaria
                });
            }
            else{
                res.status(400).json("Imobiliária não encontrado")
            }
        }
        else{
            res.status(400).json("Id de usuário inválido");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao atualizar imobiliaria');
    }    
}

// Delete
export const deletarImobiliaria = async (req, res) => {
    try{
        const id = Number(req.params.imobiliariaId);
        // verifica se o id é válido
        if (!isNaN(id)) {

            const result = await pool.query(
                `DELETE 
                FROM imobiliaria 
                WHERE idimobiliaria=$1`, 
                [id]);
                
            if (result.rowCount > 0) {
                res.json("Imobiliária deletada com sucesso");
            } 
            else {
                res.status(404).json("Imobiliária não encontrada");
            }
          } 
        else {
            res.status(400).json("Id de imobiliária inválido");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao deletar imobiliaria');
    }    
}