require('dotenv').config({ path: '.env' });

module.exports.DB= {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: 'mongoose',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
