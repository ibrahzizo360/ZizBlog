require('dotenv').config();

const config = {
  jwtSecret: process.env.JWT_SECRET,
  databaseURL: process.env.DATABASE_URL,
};

module.exports = config;
