import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function initDB() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    console.log('Conectado ao MySQL com sucesso!');

    // Cria tabela users
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tabela users criada ou já existia.');

    // Cria tabela posts
    await connection.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log('Tabela posts criada ou já existia.');

    // Insere usuários de exemplo
    const [existingUsers] = await connection.query(`SELECT COUNT(*) AS count FROM users`);
    if (existingUsers[0].count === 0) {
      await connection.query(`
        INSERT INTO users (name, email, password) VALUES
        ('João Silva', 'joao@email.com', '$2a$10$rOzZb.6O7k7k8V8V8V8V8uB8V8V8V8V8V8V8V8V8V8V8V8V8V8V8'), 
        ('Maria Santos', 'maria@email.com', '$2a$10$rOzZb.6O7k7k8V8V8V8V8uB8V8V8V8V8V8V8V8V8V8V8V8V8V8V8');
      `);
      console.log('Usuários de exemplo inseridos.');
    } else {
      console.log('Usuários já existem, pulando inserção.');
    }

    // Insere posts de exemplo
    const [existingPosts] = await connection.query(`SELECT COUNT(*) AS count FROM posts`);
    if (existingPosts[0].count === 0) {
      await connection.query(`
        INSERT INTO posts (title, content, user_id) VALUES
        ('Primeiro Post', 'Este é o conteúdo do primeiro post.', 1),
        ('Segundo Post', 'Este é o conteúdo do segundo post.', 2);
      `);
      console.log('Posts de exemplo inseridos.');
    } else {
      console.log('Posts já existem, pulando inserção.');
    }

    await connection.end();
    console.log('Inicialização do banco concluída!');
  } catch (err) {
    console.error('Erro ao inicializar o banco:', err.message);
  }
}

// Executa o script
initDB();
