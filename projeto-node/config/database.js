const mysql = require('mysql2');

// DEBUG: Log todas as variáveis de ambiente relacionadas a MySQL
console.log('Todas variáveis MySQL:', {
  MYSQLHOST: process.env.MYSQLHOST,
  MYSQLUSER: process.env.MYSQLUSER,
  MYSQLPASSWORD: process.env.MYSQLPASSWORD ? '***EXISTS***' : 'undefined',
  MYSQLDATABASE: process.env.MYSQLDATABASE,
  MYSQLPORT: process.env.MYSQLPORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD ? '***EXISTS***' : 'undefined',
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT
});

// CONFIGURAÇÃO PARA RAILWAY - com fallbacks robustos
const connection = mysql.createConnection({
  host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'railway',
  port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
  multipleStatements: true
});

connection.connect((err) => {
  if (err) {
    console.error('Erro detalhado ao conectar ao MySQL:', err.message);
    console.error('Código do erro:', err.code);
    console.error('Stack trace:', err.stack);
    return;
  }
  console.log('Conectado ao MySQL com sucesso!');
  console.log('Database:', connection.config.database);
});

module.exports = connection;