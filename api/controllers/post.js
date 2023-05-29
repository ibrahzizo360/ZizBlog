
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const Post = require('../models/postModel');
const config = require('../config');
const secret = config.jwtSecret;

const uploadPost =  async (req, res) => {
    try {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      const newPath = path + '.' + ext;
  
      await fs.promises.rename(path, newPath);
  
      const { token } = req.cookies;
      const info = await jwt.verify(token, secret);
  
      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
  
      res.json(postDoc);
    } catch (err) {
      console.error('Error creating post:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

 
const getPosts = async(req,res) =>{
    res.json(await Post.find().populate('author', ['username'])
    .sort({createdAt: -1})
    .limit(20));
};


const getPostById = async (req, res)=> {
    const {id}= req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
};

const updatePost =  async (req,res) => {
    let newPath = null;
    if (req.file){
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1]
        newPath = path+'.'+ext
        fs.renameSync(path, newPath); 
    }
    try{
    const {token}  = req.cookies;
    if (!token) {
      return res.status(401).json('Unauthorized');
    }
    jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findByIdAndUpdate(
      id,
      {
        title: title,
        summary: summary,
        content: content,
        cover: newPath ? newPath : req.body.cover,
        author: info.id,
      },
      { new: true } // Retrieve the updated document after the update
    );
    if (!postDoc) {
      return res.status(404).json('Post not found');
    }
    res.json(postDoc);
    })
    } catch(err){
      console.log(err)
    }
    };

module.exports = {uploadPost, getPosts, getPostById, updatePost};