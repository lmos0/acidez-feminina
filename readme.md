# Acidez Feminina - Ferramenta de Busca e Autenticação

## Descrição
Este projeto é uma aplicação web desenvolvida em Node.js com Express que permite aos usuários autenticados realizarem buscas de perfis no LinkedIn utilizando a API de Pesquisa do Google. O sistema inclui funcionalidades de login, autenticação JWT, persistência de dados com Sequelize e SQLite3, e renderização de páginas com EJS.

## Tecnologias Utilizadas
- **Backend:** Node.js, Express
- **Banco de Dados:** SQLite3, Sequelize
- **Autenticação:** JSON Web Token (JWT), Cookie Parser
- **Frontend:** EJS, CSS
- **APIs Externas:** Google Custom Search API
- **Gerenciamento de Variáveis de Ambiente:** dotenv

## Configuração do Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/projeto_acidez-feminina.git
cd projeto_acidez-feminina
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto e defina as variáveis necessárias:
```env
PORT=3000
EMAIL=email_para_login
PASSWORD=senha_para_login
JWT_SECRET=sua_chave_secreta
GOOGLE_API_KEY=sua_chave_api_google
GOOGLE_CX=sua_id_do_mecanismo_de_pesquisa
```

### 4. Iniciar o servidor
```bash
npm start
```
O servidor rodará em `http://localhost:3000`.

## Rotas Disponíveis

### Autenticação
- `POST /login` - Realiza login e retorna um token JWT.

### Busca de Perfis
- `GET /search` - Exibe a interface de busca (somente para usuários autenticados).
- `POST /search` - Realiza a busca de perfis no LinkedIn com base nos critérios informados.

## Estrutura do Projeto
```
projeto_acidez-feminina/
│── controllers/
│   ├── controllers.js
│── middleware/
│   ├── middleware.js
│── model/
│   ├── User.js
│── routes/
│   ├── router.js
│── config/
│   ├── db.js
│── public/
│   ├── style.css
│── views/
│   ├── search.ejs
│── app.js
│── package.json
│── .env
```

## Licença
Este projeto está sob a licença MIT.


![image](https://github.com/user-attachments/assets/2419ed47-3289-4969-8bd6-11d0fd1be7b4)
![image](https://github.com/user-attachments/assets/bdc9bca1-56ca-4e3e-9ad7-5e4a1b92f4e5)



