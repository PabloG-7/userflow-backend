const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateToken = require('../middleware/auth');

router.use(authenticateToken);

router.post('/', postController.create);
router.get('/', postController.getAll);
router.get('/user', postController.getByUser); // ← Esta rota é importante
router.get('/:id', postController.getById);
router.put('/:id', postController.update);
router.delete('/:id', postController.delete);

module.exports = router;