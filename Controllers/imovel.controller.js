import pool from '../db/db.js'


// Create
export const criarImovel = async (req, res) => {
    try{
        const { titulo, descricao, valor, n_quartos, area_construida, area_terreno, vagas_garagem, tipo_imovel, status, imobiliaria_idimobiliaria, corretor_id, endereco_idendereco } = req.body;
        const cadastro = await pool.query(
            `INSERT INTO imovel (titulo, descricao, valor, n_quartos, area_construida, area_terreno, vagas_garagem, tipo_imovel, status, imobiliaria_idimobiliaria, corretor_id, endereco_idendereco) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
            RETURNING *`, 
            [titulo, descricao, valor, n_quartos, area_construida, area_terreno, vagas_garagem, tipo_imovel, status, imobiliaria_idimobiliaria, corretor_id, endereco_idendereco]);

        const novoImovel = cadastro.rows[0];

        res.json({
            data: novoImovel,
            msg: "Imóvel cadastrado com sucesso"
        });

    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao criar imovel');
    }
}

// Read
export const getImoveis = async (req, res) => {
    try{
        const result = await pool.query(
            `SELECT * 
            FROM imovel`);

        res.json(result.rows);
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao obter imoveis');
    }
}

export const getImovelPorId = async (req, res) => {
    try{
        const id = req.params.imovelId;
        // verifica se o id é válido
        if(!isNaN(id)){
            const imovel = await pool.query(
                `SELECT * 
                FROM imovel 
                WHERE id=$1`, 
                [id]);

            if(imovel.rowCount > 0){
                res.json(imovel.rows);
            }
            else{
                res.status(400).json("Imóvel não encontrado")
            }
        }
        else{
            res.status(400).json("Id de imóvel inválido");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao obter imóvel');
    }       
}

// Update
export const atualizarImovel = async (req, res) => {
    try{
        const { titulo, descricao, valor, status } = req.body;
        const id = req.params.imovelId;
        // verifica se o id é válido
        if(!isNaN(id)){
            const imovel = await pool.query(
                `UPDATE imovel 
                SET titulo=$1, descricao=$2, valor=$3, status=$4 
                WHERE id=$5 
                RETURNING *`, 
                [titulo, descricao, valor, status, id]);

            const attImovel = imovel.rows[0]

            if(imovel.rowCount > 0){
                res.json({
                    msg: "Imóvel atualizado com sucesso",
                    imovel: attImovel
                });
            }
            else{
                res.status(400).json("Imóvel não encontrado")
            }
        }
        else{
            res.status(400).json("Id de imóvel inválido");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao atualizar imóvel');
    }   
}

// Delete
export const deletarImovel = async (req, res) => {
    try{
        const id = Number(req.params.imovelId);
        // verifica se o id é válido
        if (!isNaN(id)) {

            const result = await pool.query(`
            DELETE 
            FROM imovel 
            WHERE id=$1`, 
            [id]);

            if (result.rowCount > 0) {
                res.json("Imóvel deletado com sucesso");
            } 
            else {
                res.status(404).json("imóvel não encontrada");
            }
          } 
        else {
            res.status(400).json("Id de imóvel inválido");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao deletar imóvel');
    }     
}