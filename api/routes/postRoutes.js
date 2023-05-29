
const express = require('express');
const router  = express.Router();
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'});
const {uploadPost, getPosts, getPostById, updatePost } = require('../controllers/post')



router.post('/',uploadMiddleware.single('file'), uploadPost);

router.get('/', getPosts);
router.get('/:id', getPostById);

router.put('/', uploadMiddleware.single('file'), updatePost)


module.exports = router;