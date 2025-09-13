# 🔐 Sistema de Autenticação e CRUD de Posts - UserFlow

Projeto **Node.js + Express + MySQL** com **autenticação JWT** e **CRUD de posts**, incluindo frontend simples em **Bootstrap**.

---

## 📌 Badges

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)
![bcrypt](https://img.shields.io/badge/bcrypt-005C84?style=for-the-badge)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![FontAwesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)

---

## 🚀 Funcionalidades

- Login, registro e logout de usuários  
- Senhas criptografadas com **bcrypt**  
- Rotas privadas protegidas com **JWT**  
- CRUD completo de posts (somente usuários autenticados)  
- Frontend responsivo com **Bootstrap 5**  
- Design moderno com **glassmorphism**  

---

## 🛠️ Tecnologias

- **Backend:** Node.js, Express  
- **Banco de Dados:** MySQL  
- **Autenticação:** JWT  
- **Criptografia:** bcryptjs  
- **Frontend:** HTML5, Bootstrap 5, Font Awesome  

---

## ⚡ Como Rodar Localmente

1. **Clone o repositório**
    ```bash
    git clone https://github.com/PabloG-7/userflow-backend.git
    cd userflow-backend
    ```

2. **Instale as dependências**
    ```bash
    npm install
    ```

3. **Configure o banco de dados**
    - Crie um banco de dados no MySQL (ex: `blog_db`).
    - Execute o script `init-db.sql` que está na raiz do projeto para criar as tabelas.

4. **Configure o .env**
    ```bash
    cp .env.example .env
    ```
    - Edite o arquivo `.env` com suas credenciais do MySQL:

    ```env
    DB_HOST=localhost
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=blog_db
    DB_PORT=3306
    JWT_SECRET=seu_jwt_secret_super_seguro_aqui
    PORT=3000
    ```

5. **Execute a aplicação**
    ```bash
    # Modo desenvolvimento
    npm run dev

    # Modo produção
    npm start
    ```

A aplicação ficará disponível em:  
👉 http://localhost:3000

---

## 📖 Endpoints Principais

### 🔑 Autenticação

#### Registrar usuário
`POST /api/auth/register`

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

#### Fazer login
`POST /api/auth/login`

```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

---

### 📝 Posts (requer autenticação)

- `GET /api/posts` → Listar todos os posts
- `POST /api/posts` → Criar post

```json
{
  "title": "Meu Post",
  "content": "Conteúdo do post"
}
```

- `GET /api/posts/:id` → Buscar post por ID
- `PUT /api/posts/:id` → Atualizar post
- `DELETE /api/posts/:id` → Excluir post
