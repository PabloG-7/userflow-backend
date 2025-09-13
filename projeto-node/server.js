const express = require('express');
const app = express();

app.use(express.json());
// se usa cookies, etc, adicione aqui
// app.use(cors()) se o front estiver em outro domínio

// rotas
app.use('/api/auth', require('./routes/auth')); // <- verifique esse caminho

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Rota não encontrada' }));

// erro genérico (importantíssimo para ver o stack no log)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno', error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

console.log('ENV debug:', {
  DB_HOST: process.env.DB_HOST,
  MYSQLHOST: process.env.MYSQLHOST,
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT
});
