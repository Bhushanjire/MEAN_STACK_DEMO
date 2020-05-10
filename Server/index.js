const express = require('express');
const app = express();
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const DBConnection = require('./database/connection')

// app.use(DBConnection);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(routes);
app.use(cors());
app.listen(3000,function(){
console.log('listening on 3000');
});


module.exports = app;
