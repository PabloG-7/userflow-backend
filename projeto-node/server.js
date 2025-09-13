const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();

// ✅ MIDDLEWARES PRIMEIRO
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ ROTAS DA API SEGUNDO
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// ✅ ROTAS DO FRONTEND TERCEIRO
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// ✅ ROTA DE FALLBACK POR ÚLTIMO
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});

// No server.js, após require das rotas:
console.log('🔄 Carregando rotas...');
console.log('Rotas de auth:', authRoutes);
console.log('Rotas de posts:', postRoutes);

// E antes de cada app.use:
app.use('/api/auth', (req, res, next) => {
  console.log(`📨 Rota auth acessada: ${req.method} ${req.url}`);
  next();
}, authRoutes);

app.use('/api/posts', (req, res, next) => {
  console.log(`📨 Rota posts acessada: ${req.method} ${req.url}`);
  next();
}, postRoutes);