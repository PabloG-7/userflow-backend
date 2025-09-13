const db = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  create: (userData, callback) => {
    bcrypt.hash(userData.password, 10, (err, hash) => {
      if (err) return callback(err);
      
      const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      db.query(sql, [userData.name, userData.email, hash], callback);
    });
  },
  
  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], callback);
  },
  
  findById: (id, callback) => {
    const sql = 'SELECT id, name, email, created_at FROM users WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = User;