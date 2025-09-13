const Post = require('../models/post');

const postController = {
  create: (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Título e conteúdo são obrigatórios' });
    }
    
    Post.create({ title, content, user_id: userId }, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao criar post' });
      }
      
      res.status(201).json({ 
        message: 'Post criado com sucesso',
        postId: results.insertId 
      });
    });
  },
  
  getAll: (req, res) => {
    Post.findAll((err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao buscar posts' });
      }
      
      res.json(results);
    });
  },
  
  getById: (req, res) => {
    const postId = req.params.id;
    
    Post.findById(postId, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao buscar post' });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ message: 'Post não encontrado' });
      }
      
      res.json(results[0]);
    });
  },
  
  update: (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    const userId = req.user.id;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Título e conteúdo são obrigatórios' });
    }
    
    // Primeiro verifica se o post pertence ao usuário
    Post.findById(postId, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao buscar post' });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ message: 'Post não encontrado' });
      }
      
      const post = results[0];
      
      if (post.user_id !== userId) {
        return res.status(403).json({ message: 'Você não tem permissão para editar este post' });
      }
      
      Post.update(postId, { title, content }, (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao atualizar post' });
        }
        
        res.json({ message: 'Post atualizado com sucesso' });
      });
    });
  },
  
  delete: (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    
    // Primeiro verifica se o post pertence ao usuário
    Post.findById(postId, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao buscar post' });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ message: 'Post não encontrado' });
      }
      
      const post = results[0];
      
      if (post.user_id !== userId) {
        return res.status(403).json({ message: 'Você não tem permissão para excluir este post' });
      }
      
      Post.delete(postId, (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao excluir post' });
        }
        
        res.json({ message: 'Post excluído com sucesso' });
      });
    });
  },
  
  getByUser: (req, res) => {
    const userId = req.user.id;
    
    Post.findByUserId(userId, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao buscar posts' });
      }
      
      res.json(results);
    });
  }
};

// No postController.js, adicione esta função se não existir:
getByUser: (req, res) => {
    const userId = req.user.id;
    
    Post.findByUserId(userId, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar posts' });
        }
        
        res.json(results);
    });
}

module.exports = postController;