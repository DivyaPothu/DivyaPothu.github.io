var app  = require('express')(); // Express App include
var http = require('http').Server(app); // http server
var mysql = require('mysql'); // Mysql include
var env = app.get('env') == 'development' ? 'dev' : app.get('env');
var port = process.env.PORT || 8086;


var bodyParser = require("body-parser"); // Body parser for fetch posted data

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // Body parser use JSON data
var Sequelize=require ('sequelize');
var sequelize = new Sequelize('Birds_Database', 'root', 'MyNewPass', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  var Bird= sequelize.define('Birds', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
    },
    name: {
    type:Sequelize.STRING
    },
    family: {
    type:Sequelize.STRING,
    },
    continents:{
    type:Sequelize.STRING,
    },
    added:{
    type: Sequelize.STRING
    },
    visible:{
    type:Sequelize.STRING,
    defaultValue:false
    },
    createdAt:{
    type:Sequelize.DATE,
    default:Sequelize.NOW
    },
    updatedAt:{
    type:Sequelize.DATE,
    default:Sequelize.NOW
    }
    

   });
  
    //Applying Item Table to database
sequelize
  .sync({ force: true })
  .then(function(err) {
    console.log('It worked!table created successfully');
  }, function (err) { 
    console.log('An error occurred while creating the table:', err);
  });

 sequelize.sync({ force: true }).then(function () {
   Bird.create({
  id:'1',
  name:'Dove',
  family:'DoveFamily',
  continents:'india',
  added:'2017-10-04',
  visible:'true'
  }).then(function(){
  console.log('Data successfully inserted');
  })
});
  sequelize.sync({ force: true }).then(function () {
   Bird.create({
  id:'2',
  name:'Sparrow',
  family:'sparrowFamily',
  continents:'Us',
  added:'2017-10-4',
  visible:'false'
  }).then(function(){
  console.log('Data successfully inserted');
  })
});
var express = require('express'),
bodyParser = require('body-parser');

//var app = express();
//var router = express.Router();

// on routes that end in /users
// ----------------------------------------------------
//router.route('/Bird')




//GET API

app.get('/Getbird',function(req,res){
    var data = {
        "Data":""
    };
     sequelize.query("SELECT * FROM Birds where visible=:visible", { replacements: { visible: 'true' },type: sequelize.QueryTypes.SELECT})
  .then(function(Birds,err,rows) {
    // We don't need spread here, since only the results will be returned for select queries
    //if(rows.length!=0)
    if(Birds){
    
            data["Data"] = Birds;
            res.json(data);
        }
  });
});

//POST API

app.post('/Postbird',function(req,res){
    var id = req.body.id;
    var name = req.body.name;
    var family= req.body.family;
    var continents = req.body.continents;
     var added= req.body.added;
      var visible= req.body.visible;
     
      console.log(req.body);
    
    console.log(id);
    var data = {
        "Data":""
    };
   if(!!id&& !!name && !!family && !!continents && !!added && !!visible) {
sequelize.query("INSERT INTO birds (id,name,family,continents,added,visible) VALUES('" + id+ "','" + name+ "','" + family + "','" + continents+ "','" + added+ "','" + visible+ "')",[id,name,family,continents,added,visible],{type: sequelize.QueryTypes.INSERT}).then(function(Birds,err) {
    
 if(!!err){
                data["Data"] = "Error Adding data";
            }else{
                //data["Data"] = 0;
                data["Data"] = "Bird Added Successfully";
            }
            res.json(data);
        });
    }else{
        data["Data"] = "Please provide all required data of bird";
        //res.json(404).data);
res.status(404).json(data);
    }
});








//GET by id

app.get('/GetbirdById',function(req,res){
    var data = {
        "Data":""
    };
     sequelize.query("SELECT * FROM Birds where id=2", { replacements: { visible: 'true' },type: sequelize.QueryTypes.SELECT})
  .then(function(Birds,err,rows) {
    // We don't need spread here, since only the results will be returned for select queries
    if(Birds)
    {
            data["Data"] = Birds;
            res.json(data);
        }
        else
        {
          data["Data"] = 'No data Found..';
          res.json(data);
        }
      
  });
});




//DELETE 
app.delete('/Deletebird', function(req,res){

   var id = req.body.id;
   
    var data = {

      "Data":""
    };

    if(!!id) {
sequelize.query("DELETE from  Birds where id= '"+id+"' ",[id],{type: sequelize.QueryTypes.DELETE}).then(function(Birds,err) {
    
 if(!!err){
                data["Data"] = "Error Adding data";
            }else{
                data["Data"] = "Bird Deleted Successfully";
            }
            res.json(data);
        });
    }else{
        data["Data"] = "Please provide all required data of bird";
  
    
}
});



//PUT 
app.put('/putbird', function(req,res){

   var id = req.body.id;
   var name= req.body.name;
    var data = {

      "Data":""
    };

    if(!!id&& !!name ) {
sequelize.query("UPDATE Birds set name= '"+name+"' where id= '"+id+"' ",[id,name],{type: sequelize.QueryTypes.UPDATE}).then(function(Birds,err) {
    
 if(!!err){
                data["Data"] = "Error Adding data";
            }else{
                data["Data"] = "Bird Updated Successfully";
            }
            res.json(data);
        });
    }else{
        data["Data"] = "Please provide all required data of bird";
          res.json(404,data);
    
}
});






  // app.use('/api', router);
   app.listen(port);
console.log('Magic happens on port ' + port);
