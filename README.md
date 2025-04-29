# 🔐 UserFlow API

API RESTful para gerenciamento de usuários, desenvolvida com Node.js, Express e MySQL. Permite operações CRUD completas com segurança e eficiência.

## 🔧 Tecnologias

| Tecnologia | Função |
|------------|--------|
| <img src="https://cdn.iconscout.com/icon/free/png-256/free-node-js-1174925.png" width="16"> **Node.js** | Ambiente de execução |
| <img src="https://expressjs.com/images/favicon.png" width="16"> **Express** | Framework HTTP |
| <img src="https://www.mysql.com/common/logos/logo-mysql-170x115.png" width="16"> **MySQL** | Banco de dados |
| <img src="https://dotenv.org/favicon.ico" width="16"> **Dotenv** | Variáveis de ambiente |
| <img src="https://cors-anywhere.herokuapp.com/favicon.ico" width="16"> **CORS** | Segurança de requisições |

## 🚀 Funcionalidades

### 👥 Gestão de Usuários
- **Cadastro**: `POST /api/users`  
  ```json
  {
    "name": "João Silva",
    "email": "joao@email.com",
    "age": 28,
    "address": "Rua Exemplo, 123",
    "phone": "(11) 99999-9999"
  }
  ```
- Listagem: GET /api/users

- Atualização: PUT /api/users/:id

- Exclusão: DELETE /api/users/:id

## ⚙️ Instalação
# Pré-requisitos

- Node.js v18+
- MySQL 8.0+

## Clone o repositório
```bash
git clone https://github.com/pablog-7/userflow.git
cd userflow

# Instale as dependências
npm install

# Configure o banco de dados (crie um arquivo .env)
cp .env.example .env
# Edite o .env com suas credenciais do MySQL

# Inicie o servidor
npm start
```

## 🌐 Rotas da API
Método	Endpoint	Descrição
- POST	/api/users	Cria novo usuário 
- GET	/api/users	Lista todos os usuários
- GET	/api/users/:id	Busca usuário por ID
- PUT	/api/users/:id	Atualiza usuário
- DELETE	/api/users/:id	Remove usuário

## 📊 Exemplo de Respostas
Sucesso (200 OK):
```
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "age": 28,
  "address": "Rua Exemplo, 123",
  "phone": "(11) 99999-9999",
  "createdAt": "2023-11-20T12:00:00.000Z"
}
```
Erro (404):
```
{
  "error": "Usuário não encontrado"
}
```

## 🤝 Como Contribuir
Faça um Fork

Crie uma branch (git checkout -b feature/nova-func)

Commit (git commit -am 'Adiciona X funcionalidade')

Push (git push origin feature/nova-func)

Abra um Pull Request

## 📄 Licença
MIT © Pablo G.
