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

```bash
# Clone o repositório
git clone https://github.com/PabloG-7/userflow-backend.git
cd userflow-backend

# Instale as dependências
npm install

# Configure o .env
cp .env.example .env

# Execute em modo desenvolvimento
npm run dev

A aplicação ficará disponível em:
👉 http://localhost:3000
```
📖 Endpoints Principais

POST /api/auth/register → Registrar usuário

POST /api/auth/login → Fazer login

GET /api/posts → Listar posts

POST /api/posts → Criar post

PUT /api/posts/:id → Atualizar post

DELETE /api/posts/:id → Excluir post
