// const config = require('../config/db.config.js');
const mongoose=require('mongoose')
const { DB } = require('../config/db.config.js');

const db=`mongodb+srv://${DB.USER}:${DB.PASSWORD}@cluster0.benew.mongodb.net/${DB.DB}?retryWrites=true&w=majority`
mongoose.connect(db,{
  useNewUrlParser:true,
}).then(()=>console.log('Connected to DB')).catch((e)=>console.log(e));




