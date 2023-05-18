const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors(
    {credentials:true, origin:'http://localhost:3000'}
));
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
const postsRouter = require('./controllers/post');
const userRouter = require('./controllers/user');
app.use(postsRouter);
app.use(userRouter);
const config = require('./config');


mongoose.connect(config.databaseURL);

app.listen(4000)