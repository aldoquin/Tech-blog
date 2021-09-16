const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();
const connectDB = require('./backend copy/database/db')
const routes = require('./backend copy/routes/routes')
const Comment = require('./backend copy/schema/comment')



const hbs = exphbs.create({

});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json())
app.use(express.static(path.join(__dirname +'/public')));
app.use('/api',routes)
app.use(express.urlencoded({ extended: true }));


app.get('/welcome',(req,res)=>{
  res.render('welcome');
});

app.get('/login',(req,res)=>{
  res.render('login');
});

app.get('/dashboard',async(req,res)=>{
  try {
    const dbC = await Comment.find().lean();
    console.log(dbC);
    res.render('dashboard',{dbC});
  } catch (error) {
    console.log(error);
  }
})
app.post('/signup',(req,res)=>{
})
app.get('/',(req,res)=>{
  res.render('welcome')
})


connectDB();
app.listen(port,()=>{
  console.log(`App Listening port ${port}`);
})

