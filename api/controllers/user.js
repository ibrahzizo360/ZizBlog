const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const salt = bcrypt.genSaltSync(10);
const router = express.Router();
const config = require('../config');
const secret = config.jwtSecret;


const register = async (req,res) => {
    const {username, password} = req.body;
    try{
        const UserDoc = await User.create({   
            username,
            password: bcrypt.hashSync(password, salt),
        })
        res.json(UserDoc);
    }
    catch(e) {
        res.status(400).json(e)
    }
};

const login = async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk){
        jwt.sign({username, id : userDoc._id}, secret, {}, (err,token)=>{
            if (err) {
                res.status(500).json('error signing token');
            } else {
                res.cookie('token', token).json({
                    id:userDoc._id,
                    username,
                });
            }
        });
    }
    else{
         res.status(400).json('wrong credentials');
    }
};

const getProfile = (req, res) => {
    try {
    const { token } = req.cookies;
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      res.json(info);
    });
    } catch(err){
        console.log(err)
    }
    
  };

const logout = (req,res)=>{
    res.cookie('token', '').json('ok');
};

module.exports = {logout, getProfile, register, login};