// controllers/authController.js
const db = require('../config/database');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Campos faltando' });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO users (name,email,password) VALUES (?,?,?)',
      [name, email, hash]
    );

    return res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Erro em /register:', err);
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};
