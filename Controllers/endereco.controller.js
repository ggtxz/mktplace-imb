import pool from '../db/db.js'


// Create
export const criarEndereco = async (req, res) => {
    try{
        const { cidade, cep, tipo_logradouro, logradouro, numero, complemento, apartamento, condominio, bairro } = req.body
        const cadastro = await pool.query(
            `INSERT INTO endereco (cidade, cep, tipo_logradouro, logradouro, numero, complemento, apartamento, condominio, bairro) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
            RETURNING *`,
            [cidade, cep, tipo_logradouro, logradouro, numero, complemento, apartamento, condominio, bairro]
        );

        const novoEndereco = cadastro.rows[0];

        res.json({
            msg: "Endereço cadastrado com sucesso",
            endereco: novoEndereco
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao criar endereço');
    }
}

// Read
export const getEnderecos = async (req, res) => {
    try{
        const result = await pool.query(
            `SELECT * 
            FROM endereco`);

        res.json(result.rows);
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao obter endereços');
    }
}

export const getEnderecoPorId = async (req, res) => {
    try{
        const id = req.params.enderecoId;
        // verifica se o id é válido
        if(!isNaN(id)){
            const endereco = await pool.query(
                `SELECT * 
                FROM endereco 
                WHERE idendereco=$1`, 
                [id]);

            if(endereco.rowCount > 0){
                res.json(endereco.rows);
            }
            else{
                res.status(400).json("Endereço não encontrado")
            }
        }
        else{
            res.status(400).json("Id de endereço inválido");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao obter endereço');
    }    
}

// Update
export const atualizarEndereco = async (req, res) => {
    try{
        const { cidade, cep, tipo_logradouro, logradouro, numero, complemento, apartamento, condominio, bairro } = req.body;
        const id = req.params.enderecoId;
        // verifica se o id é válido
        if(!isNaN(id)){
            const endereco = await pool.query(
                `UPDATE endereco 
                SET cidade=$1, cep=$2, tipo_logradouro=$3, logradouro=$4, numero=$5, complemento=$6, apartamento=$7, condominio=$8, bairro=$9
                WHERE idendereco=$10
                RETURNING *`, 
                [cidade, cep, tipo_logradouro, logradouro, numero, complemento, apartamento, condominio, bairro, id]);

            const attEndereco = endereco.rows[0]

            if(endereco.rowCount > 0){
                res.json({
                    msg: "Endereço atualizado com sucesso",
                    endereco: attEndereco
                });
            }
            else{
                res.status(400).json("Endereço não encontrado")
            }
        }
        else{
            res.status(400).json("Id de endereço inválido");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao atualizar endereço');
    }    
}

// Delete
export const deletarEndereco = async (req, res) => {
    try{
        const id = Number(req.params.enderecoId);
        // verifica se o id é válido
        if (!isNaN(id)) {

            const result = await pool.query(
                `DELETE 
                FROM endereco 
                WHERE id=$1`, 
                [id]);
                
            if (result.rowCount > 0) {
                res.json("Endereço deletado com sucesso");
            } 
            else {
                res.status(404).json("Endereço não encontrada");
            }
          } 
        else {
            res.status(400).json("Id de endereço inválido");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao deletar endereço');
    }    
}