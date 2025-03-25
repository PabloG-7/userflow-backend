# *UserFlow*  

UserFlow é um projeto de backend desenvolvido com *Node.js* e *MySQL* para gerenciar usuários. Ele fornece uma *API RESTful* que permite criar, listar e gerenciar dados de forma simples e eficiente.  

## *Funcionalidades*  

### *Cadastro de Usuários*  
- Criação de usuários com *nome, e-mail, idade, endereço e telefone*.  

### *Listagem de Usuários*  
- Obtenha uma lista de todos os usuários cadastrados.  

### *Atualização de Usuários*  
- Permite modificar as informações dos usuários já cadastrados.  

### *Exclusão de Usuários*  
- Remova usuários do banco de dados.  

### *Cadastro de Comentários*  
- Usuários podem enviar comentários.
  

## *Tecnologias Utilizadas*  
- *Node.js* – Ambiente de execução JavaScript.  
- *Express* – Framework para criação da API.  
- *MySQL* – Banco de dados para armazenar usuários e comentários. 
- *Dotenv* – Gerenciamento de variáveis de ambiente.  
- *Cors* – Permite requisições de diferentes origens.  

## *Como Usar*  

### *Pré-requisitos*  
- *Node.js* instalado.  
- *MySQL* instalado e configurado.  

### *Instalação*  

1. *Clone o repositório:*  
   bash
   git clone https://github.com/seu-usuario/userflow.git
   cd userflow
     

2. *Instale as dependências:*  
   bash
   npm install
     

3. *Configure as variáveis de ambiente:*  
   - Crie um arquivo **.env** e adicione suas configurações do banco de dados:  
     
     DB_HOST=localhost
     DB_USER=
     DB_PASSWORD=
     DB_NAME=userflow
     DB_PORT=3306
       

4. *Inicie o servidor:*  
   bash
   npm start
     

5. *A API estará disponível em:*  
   
   http://localhost:3000/api/users
     

## *Rotas da API*  

### *Usuários*  

| Método  | Rota                | Descrição                  |
|---------|--------------------|----------------------------|
| POST  | /api/users       | Cadastra um novo usuário  |
| GET   | /api/users       | Lista todos os usuários   |
| PUT   | /api/users/:id   | Atualiza um usuário pelo ID |
| DELETE | /api/users/:id   | Remove um usuário |
