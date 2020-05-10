// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const DBURL = 'mongodb://localhost/atkt'; 

// MongoClient.connect(DBURL,{useUnifiedTopology : true},function(error,result){
//     if(result)
//         console.log('Connected');
//     else
//         console.log('Failed to connect');
// });

mongoose.connect(DBURL, {useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify : false},function(error,res){
    if(error){
        console.log('Failed to connect');
    }else{
        console.log('Connected to mongoose');
    }
});
