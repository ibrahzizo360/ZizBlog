const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const app = express();
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
app.use(cors(
    {credentials:true, origin:'http://localhost:3000'}
));
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
const config = require('./config');

app.use(cookieParser());

app.use('/user', userRoutes);
app.use('/post', postRoutes)



const connectDB = async() => {
    try{
        const conn = await mongoose.connect(config.databaseURL,{
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

connectDB()
app.listen(4000)