import pool from '../db/db.js'


// Create
export const criarImg = async (req, res) => {
    try {
        const { alt, id_imovel } = req.body;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ msg: "Nenhuma imagem enviada" });
        }

        const filePaths = files.map(file => ({
            filePath: `/public/images/${file.filename}`,
            alt: Array.isArray(alt) ? alt[files.indexOf(file)] : alt,
            id_imovel: id_imovel
        }));

        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const insertQueries = filePaths.map(fileData => {
                return client.query(
                    `INSERT INTO imagem (file, alt, id_imovel) 
                     VALUES ($1, $2, $3) 
                     RETURNING *`,
                    [fileData.filePath, fileData.alt, fileData.id_imovel]
                );
            });

            const results = await Promise.all(insertQueries);

            await client.query('COMMIT');

            res.json({
                msg: "Imagens salvas com sucesso",
                data: results.map(result => result.rows[0])
            });
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }

    } catch (err) {
        console.log(err);
        res.status(500).json('Erro ao salvar imagens');
    }
};

// Read
export const getImgs = async (req, res) => {
    try{
        const result = await pool.query(
            `SELECT * 
            FROM imagem`);

        res.json(result.rows);
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao obter imagens');
    }
}

export const getImgPorId = async (req, res) => {
    try{
        const id = req.params.imgId;
        // verifica se o id é válido
        if(!isNaN(id)){
            const img = await pool.query(
                `SELECT * 
                FROM imagem
                WHERE id=$1`, 
                [id]);

            if(img.rowCount > 0){
                res.json(img.rows);
            }
            else{
                res.status(400).json("Imagem não encontrada")
            }
        }
        else{
            res.status(400).json("Id de imagem inválido");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao obter imagem');
    }    
}

// Update
export const atualizarImg = async (req, res) => {
    try{
        const { alt } = req.body;
        const id = req.params.imgId;
        // verifica se o id é válido
        if(!isNaN(id)){
            const img = await pool.query(
                `UPDATE imagem 
                SET alt=$1 
                WHERE id=$2 
                RETURNING *`, 
                [alt, id]);

            const attImg = img.rows[0]

            if(img.rowCount > 0){
                res.json({
                    msg: "Imagem atualizada com sucesso",
                    img: attImg
                });
            }
            else{
                res.status(400).json("Imagem não encontrado")
            }
        }
        else{
            res.status(400).json("Id de imagem inválido");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao atualizar imagem');
    }    
}

// Delete
export const deletarImg = async (req, res) => {
    try{
        const id = Number(req.params.imgId);
        // verifica se o id é válido
        if (!isNaN(id)) {

            const result = await pool.query(
                `DELETE 
                FROM imagem
                WHERE id=$1`, 
                [id]);
                
            if (result.rowCount > 0) {
                res.json("Imagem deletada com sucesso");
            } 
            else {
                res.status(404).json("Imagem não encontrada");
            }
          } 
        else {
            res.status(400).json("Id de imagem inválido");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao deletar imagem');
    }    
}

export const getImgPorImovel = async (req, res) => {
    try{
        const id = Number(req.params.imovelId);
        // verifica se o id é válido
        if (!isNaN(id)) {

            const result = await pool.query(
                `SELECT * 
                FROM imagem 
                WHERE id_imovel=$1`,
                [id]);

            if (result.rowCount > 0) {
                res.json(result.rows);
            }

            else {
                res.status(200).json("Imóvel não possui imagens");
            }

        }
    }
    catch(err){
        console.log(err);
        res.status(500).json('Erro ao obter imagens');
    }    
}