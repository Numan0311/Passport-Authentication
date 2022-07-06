require('dotenv').config();
const express = require('express');
require('./app/models/index');
const fileUpload=require('express-fileupload');
const userRouter=require('./app/routes/user.routes');
const courseRouter=require('./app/routes/course.routes');
const path = require('path');
const passport=require('passport')
require('./auth')
const session=require('express-session')


const app = express();
app.use(express.json());

// Google AUth
function isLoggedIn(req,res,next){
  req.user?next():res.sendStatus(401);
}

app.use(session({secret:'cats'}))

app.use(passport.initialize());
app.use(passport.session())

app.get('/',(req,res)=>{
  res.render('index')

  // res.send('<a href="/auth/google">Authenticate with google </a>' +
  //     '<br> <a href="/auth/facebook">Authenticate with Facebook</a>')
})
app.get('/auth/google',passport.authenticate('google',{
  scope:['email','profile']
}));
app.get('/auth/facebook',passport.authenticate('facebook'));



app.get('/google/callback',passport.authenticate('google',{
  successRedirect:'/protected',
  failureRedirect:'auth/failure'
}));


app.get('/facebook/callback',passport.authenticate('facebook',{
  successRedirect:'/protected',
  failureRedirect:'auth/failure'
}));


app.get('/auth/failure',(req,res)=>{
  res.send("Something went wrong")
})
app.get('/protected',isLoggedIn,(req,res)=>{
  res.send("Success")
});

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout(()=>console.log('logout'));
  res.redirect('/');
})

// --------------

app.set('views', './views/pages');
app.set('view engine', 'ejs');

app.get('/xyx',(req,res)=>{
  res.render('index')
})

// -------------


// parse requests of content-type - application/json
app.use('/uploads', express.static(path.join(__dirname,'.', 'app', 'assets','uploads')));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// app.use(multer)

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use(fileUpload())


const httpServer = require('http').createServer(app);
let PORT=3000;
// process.env.STATUS === 'production'
//   ? (PORT = process.env.PROD_PORT)
//   : (PORT = process.env.DEV_PORT);
const server=httpServer.listen(PORT, () => {
  console.log(`Server listening on *:${PORT}`);
});

app.use('/api/v1/user/',userRouter);
app.use('/api/v1/course/',courseRouter);

