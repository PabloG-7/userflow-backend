const mysql = require('mysql2');

// Tenta usar connection string primeiro
if (process.env.DATABASE_URL) {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  connection.connect((err) => {
    if (err) {
      console.error('❌ Erro com DATABASE_URL:', err.message);
    } else {
      console.log('✅ Conectado via DATABASE_URL!');
    }
  });
  module.exports = connection;
} else {
  // Fallback para variáveis individuais
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('❌ Erro com variáveis individuais:', err.message);
    } else {
      console.log('✅ Conectado via variáveis individuais!');
    }
  });
  
  module.exports = connection;
}