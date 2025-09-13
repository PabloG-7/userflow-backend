const mysql = require('mysql2');
require('dotenv').config();

// CONFIGURAÇÃO PARA RAILWAY - usa variáveis de ambiente
const connection = mysql.createConnection({
  host: process.env.MYSQLHOST || process.env.DB_HOST,
  user: process.env.MYSQLUSER || process.env.DB_USER,
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
  database: process.env.MYSQLDATABASE || process.env.DB_NAME,
  port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
  multipleStatements: true
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.message);
    console.log('Variáveis de ambiente:', {
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      database: process.env.MYSQLDATABASE,
      port: process.env.MYSQLPORT
    });
    return;
  }
  console.log('Conectado ao MySQL com sucesso!');
});

module.exports = connection;