const db = require('../config/database');

const Post = {
  create: (postData, callback) => {
    const sql = 'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)';
    db.query(sql, [postData.title, postData.content, postData.user_id], callback);
  },
  
  findAll: (callback) => {
    const sql = `
      SELECT posts.*, users.name as author 
      FROM posts 
      INNER JOIN users ON posts.user_id = users.id 
      ORDER BY posts.created_at DESC
    `;
    db.query(sql, callback);
  },
  
  findById: (id, callback) => {
    const sql = `
      SELECT posts.*, users.name as author 
      FROM posts 
      INNER JOIN users ON posts.user_id = users.id 
      WHERE posts.id = ?
    `;
    db.query(sql, [id], callback);
  },
  
  update: (id, postData, callback) => {
    const sql = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
    db.query(sql, [postData.title, postData.content, id], callback);
  },
  
  delete: (id, callback) => {
    const sql = 'DELETE FROM posts WHERE id = ?';
    db.query(sql, [id], callback);
  },
  
  findByUserId: (userId, callback) => {
    const sql = 'SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC';
    db.query(sql, [userId], callback);
  }
};

module.exports = Post;