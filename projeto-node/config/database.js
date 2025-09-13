// config/database.js
const mysql = require('mysql2/promise');

function parseDatabaseUrl(url) {
  try {
    const u = new URL(url);
    return {
      host: u.hostname,
      user: u.username,
      password: u.password,
      database: u.pathname.replace(/^\//,''),
      port: u.port || 3306
    };
  } catch (e) {
    return null;
  }
}

const dbUrl = process.env.DATABASE_URL || process.env.DATABASE_URL_LOCAL;
const parsed = dbUrl ? parseDatabaseUrl(dbUrl) : null;

const pool = mysql.createPool({
  host: parsed?.host || process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
  user: parsed?.user || process.env.DB_USER || process.env.MYSQLUSER || 'root',
  password: parsed?.password || process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
  database: parsed?.database || process.env.DB_NAME || process.env.MYSQLDATABASE || 'test',
  port: Number(parsed?.port || process.env.DB_PORT || process.env.MYSQLPORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
