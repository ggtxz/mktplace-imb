# Backend MetaPrise Imobiliário ![Badge](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Badge](	https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

Desenvolvido por:  
Equipe TI - DAC Engenharia  

---

## Pré-requisitos

- Node.js (versão 20 ou superior) 
- PostGres (instalado e em execução)

## Instalação

1. Clone o repositório e instale as dependencias utilizando os seguintes comandos:

```bash
git clone https://github.com/ggtxz/mktplace-imb.git

npm install
```

2. Crie um arquivo .env na raiz do projeto e adicione o seguinte conteúdo:
```plaintext
JWT_SECRET='e525c84ccc7f079ef7e4f54e398d9cbd36f027ff3341d15a1fc38cf06cda428ab70002d437582277e31248fb950468e34cfa3a7010004c63f6f677241018c2f3'
``` 

3. Crie o arquivo db.js na pasta db com o seguinte conteúdo:
```js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'user', // nome de usuário do Banco de Dados
  host: 'localhost', 
  database: 'mktplace_imb', // Nome do Banco de dados
  password: 'sua senha do postgres', // Senha do Banco de dados
  port: 5432, // Porta padrão do PostgreSQL
});

export default pool;
```
user: coloque seu usuário do Postgres

database: nome do banco de dados

password: coloque sua senha do Postgres

## Executando o Servidor
Após concluir os passos de instalação, você pode executar o servidor utilizando o seguinte comando:
```bash
npm run dev
```

## API Endpoints

-`POST /usuario/`: Cria/Cadastra um usuário  
-`POST /usuario/login`: Realiza o login do usuário  
-`GET /usuario/`: Obtém todos usuários  
-`GET /usuario/:usuarioId`: Obtém as informações de um usuário específico  
-`PUT /usuario/:usuarioId`: Atualiza informações do usuário  
-`DELETE /usuario/:usuarioId`: Deleta um usuário  

-Mais endpoints em breve

Lembre-se de ajustar as informações necessárias, como o usuário do banco de dados, a senha e a porta, de acordo com o ambiente de desenvolvimento.
