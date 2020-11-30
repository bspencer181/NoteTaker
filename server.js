// Dependencies
// =============================================================
var express = require('express');
var path = require('path');
var fs= require('fs');
const { json } = require('express');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
var db = require("./db/db.json") || [];

// Sets up the Express app to handle data parsing. this makes it so it can read :id and use it
app.use(express.urlencoded({ extended: true }));
//using json in the site:
app.use(express.json());
//sending the public folder to the user for them to download
app.use(express.static("./public"));

app.get("/notes",function(req,res){
    res.sendFile(__dirname+"/public/notes.html");
});

app.get("/api/notes",function(req, res){
    res.json(db); 
 });

app.get("*",function(req, res){
    res.sendFile(__dirname+"/public/index.html");
});

app.post("/api/notes",function(req,res){
    
    req.body.id = db.length;
    console.log(req.body);
    db.push(req.body);

    console.log({db})
    fs.writeFileSync("./db/db.json",JSON.stringify(db));
    res.end();
});

app.delete('/api/notes/:id', function(req, res) {
   var id = +req.params.id;
   console.log({id});
   db = db.filter(function(element){
       return element.id !== id
   });
   console.log(db);
   fs.writeFileSync("./db/db.json",JSON.stringify(db));
   res.json(db);
});



app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
  });