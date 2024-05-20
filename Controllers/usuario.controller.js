import pool from '../db/db.js'

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

export const criarUsuario = async (req, res) => {
    try{
        const { nome, email, senha, creci, telefone, plano_idPlano, Endereco_idEndereco } = req.body;
        console.log(nome, email, senha, creci, telefone, plano_idPlano, Endereco_idEndereco)

        if(isValidEmail(email)){

            const cadastro = await pool.query(
                `INSERT INTO usuario (nome, email, senha, creci, telefone, plano_idPlano, Endereco_idEndereco) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [nome, email, senha, creci, telefone, plano_idPlano, Endereco_idEndereco]
              );
              res.send('Usuário inserido com sucesso');
        }

        else{
            res.status(400).send('Email inválido');
        }
    }
    catch(err){
        if(err.detail.includes("(creci)")){
            console.error(err.message);
            res.status(400).send('Erro ao cadastrar usuário, CRECI já utilizado');
        }

        else if(err.detail.includes("(email)")){
            console.error(err.message);
            res.status(400).send('Erro ao cadastrar usuário, email já utilizado');
        }

        else{
            console.error(err.code, err.message);
            res.status(500).send('Erro ao cadastrar usuário');
        }
    }

}

export const getUsuarios = async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM usuario');
        res.json(result.rows);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
      }
}

/*export const atualizarUsuario = async (req, res) => {
    
}*/

export const deletarUsuario = async (req, res) => {
    try{
        const id = Number(req.params.usuarioId);
        if (!isNaN(id)) {
            try {
                const result = await pool.query('DELETE FROM usuario WHERE idusuario=$1', [id]);
                if (result.rowCount > 0) {
                    res.json("Usuário deletado com sucesso");
                } 
                else {
                    res.status(404).json("Usuário não encontrado");
                }
            } 
            catch (error) {
                console.error('Erro ao deletar usuário:', error);
                res.status(500).json("Erro ao deletar usuário");
            }
          } 
        else {
            res.status(400).json("Id de usuário inválido");
          }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Erro ao deletar usuário');
    }
}

