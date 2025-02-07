const db = require('../config/db');

const getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

const createUser = (req, res) => {
  const { name, email, idade, endereço, telefone } = req.body;
  db.query(
      'INSERT INTO users (name, email, idade, endereço, telefone) VALUES (?, ?, ?, ?, ?)',
      [name, email, idade, endereço, telefone],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ id: results.insertId, name, email, idade, endereço, telefone });
      }
  );
};

module.exports = { getAllUsers, createUser };