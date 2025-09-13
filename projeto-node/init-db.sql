-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS blog_db;
USE blog_db;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de posts
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Inserir dados de exemplo (opcional)
INSERT INTO users (name, email, password) VALUES 
('João Silva', 'joao@email.com', '$2a$10$rOzZb.6O7k7k8V8V8V8V8uB8V8V8V8V8V8V8V8V8V8V8V8V8V8V8'), -- senha: 123456
('Maria Santos', 'maria@email.com', '$2a$10$rOzZb.6O7k7k8V8V8V8V8uB8V8V8V8V8V8V8V8V8V8V8V8V8V8V8'); -- senha: 123456

INSERT INTO posts (title, content, user_id) VALUES 
('Primeiro Post', 'Este é o conteúdo do primeiro post.', 1),
('Segundo Post', 'Este é o conteúdo do segundo post.', 2);