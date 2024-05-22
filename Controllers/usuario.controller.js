import pool from '../db/db.js'
import gerarToken from '../Utils/jwt.js';

// Função para validar email do usuário
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

// Cria usuário
export const criarUsuario = async (req, res) => {
    try{
        const { nome, email, senha, creci, telefone, plano_idPlano, Endereco_idEndereco } = req.body;
        if(isValidEmail(email)){

            const cadastro = await pool.query(
                `INSERT INTO usuario (nome, email, senha, creci, telefone, plano_idPlano, Endereco_idEndereco) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [nome, email, senha, creci, telefone, plano_idPlano, Endereco_idEndereco]
              );
            
            const usuario = await pool.query(
                `SELECT * FROM usuario WHERE creci=$1`, [creci] 
            )

            const token = gerarToken(usuario.rows[0])
            res.json({
                data: usuario.rows[0],
                token: token,
                msg: "Usuário cadastrado com sucesso"
            });
        }

        else{
            res.status(400).send('Email inválido');
        }
    }
    catch(err){
            console.error(err.message);
            res.status(400).send('Erro ao cadastar usuário, email ou creci já casdastrados');

    }

}

// Lê usuarios
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

// atualiza informações dos usuários
export const atualizarUsuario = async (req, res) => {
    try{
        const {telefone, Endereco_idEndereco } = req.body;
        const id = req.params.usuarioId;
        // verifica se o id é válido
        if(!isNaN(id)){
            const usuario = await pool.query(`UPDATE usuario SET telefone=$1, Endereco_idEndereco=$2 WHERE idusuario=$3`, [telefone, Endereco_idEndereco, id]);
            res.json("Usuario atualizado com sucesso")
        }
        else{
            res.status(400).json("Id de usuário inválido");
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json("Erro ao atualizar usuário");
    }
}

// deleta usuário
export const deletarUsuario = async (req, res) => {
    try{
        const id = Number(req.params.usuarioId);
        // verifica se o id é válido
        if (!isNaN(id)) {
            const result = await pool.query('DELETE FROM usuario WHERE idusuario=$1', [id]);
            if (result.rowCount > 0) {
                res.json("Usuário deletado com sucesso");
            } 
            else {
                res.status(404).json("Usuário não encontrado");
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

// autentica o usuário
export const login = async (req, res) =>{
    try{
        const {email, senha} = req.body
        const usuario = await pool.query(`SELECT idusuario FROM usuario WHERE email=$1 AND senha=$2`, [email, senha])
        var token = null;
        if(usuario.rowCount > 0){
            
            token = gerarToken(usuario.rows[0])
            res.json({
              data: usuario.rows[0],
              token: token,
              msg: "Login realizado com sucesso"
            });
        }

        else{
            res.status(400).json("Email ou senha não conferem")
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao fazer login');
    }
}


// lê um único usuário através do ID
export const getUsuarioPorId = async (req, res) =>{
    try{    
        const id = req.params.usuarioId;
        // verifica se o id é válido
        if(!isNaN(id)){
            const usuario = await pool.query(`SELECT * FROM usuario WHERE idusuario=$1`, [id]);

            if(usuario.rowCount > 0){
                res.json(usuario.rows);
            }
            else{
                res.status(400).json("Usuário não encontrado")
            }
        }
        else{
            res.status(400).json("Id de usuário inválido");
        }
        
    }
    catch(err){
        res.statu(500).json("Erro ao procurar usuário")
    }
}