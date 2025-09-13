const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
  register: (req, res) => {
    const { name, email, password } = req.body;
    
    // Validações básicas
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    
    User.findByEmail(email, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      
      if (results.length > 0) {
        return res.status(409).json({ message: 'Email já cadastrado' });
      }
      
      User.create({ name, email, password }, (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao criar usuário' });
        }
        
        res.status(201).json({ 
          message: 'Usuário criado com sucesso',
          userId: results.insertId 
        });
      });
    });
  },
  
  login: (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }
    
    User.findByEmail(email, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      
      if (results.length === 0) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
      
      const user = results[0];
      
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        
        if (!isMatch) {
          return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );
        
        res.json({
          message: 'Login realizado com sucesso',
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });
      });
    });
  }
};

module.exports = authController;