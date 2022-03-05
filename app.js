const express = require ('express');
const path = require('path')
const hbs = require ('hbs');
const session = require('express-session');
const fileupload = require('express-fileupload');

require('dotenv').config();

const secured = require('./middleware/secured')

const routeIndex = require('./router/index');
const routeLogin = require('./router/login');

const routeEmail = require('./router/contact')


const PORT = process.env.PORT || 3001;


app = express();

// app.use(fileupload({
//     useTempFiles:true,
//     tempFileDir:"/temp/"
// }))

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }));
  

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))



const isAuth = (req,res,next)=>{
    app.locals.logged = req.session.user;
    next();
}

app.set('view engine', 'hbs')
//indecamos a hbs donde tiene que buscar los archivos parciales
hbs.registerPartials(path.join(__dirname,'./views/partials'))


app.use('/',isAuth,routeIndex);
app.use('/email',routeEmail);
app.use('/login', routeLogin);



app.listen(process.env.PORT,(err)=>{
    err 
    ? console.log(`Error insesperado`)
    : console.log(`puesto corriendo http://localhost:${PORT}`);
})