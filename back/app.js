const express = require('express');
const router = require('./src/routes/routes');
const sessionRoutes = require('./src/routes/sessionRoutes');
const path =require('path');
const bodyParser = require('body-parser')
const Middlewares = require('./src/middlewares/middlewares');
const cors = require('cors');
const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.set("port",process.env.PORT || 3000)
app.get('/',(req,res)=>res.sendFile(path.join(__dirname+'/public/index.html')));
/*app.get('/',(req,res)=>{
    res.json('index');
});*/
app.use('/', sessionRoutes);
app.use('/', Middlewares.apitoken, router);
app.get('/*',(req,res)=>res.sendFile(path.join(__dirname+'/public/index.html')));
app.listen(app.get('port'), () => {
    console.log('Corriendo en el puerto :' + app.get('port'));
});