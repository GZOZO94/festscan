const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs=require('ejs');
const pg = require('pg');
const connectionString="postgres://czdwudvylkbbrd:b07dba3737e5a2324ae060004d7afd41e54bd2fc0561bc068c8ef42921d97c8b@ec2-46-51-187-253.eu-west-1.compute.amazonaws.com:5432/d34ai1jentrfoc";
const port = process.env.PORT || 3000;
const download = require('image-downloader');
const path = require('path');
const fs=require('fs');
const util=require('util');

pg.defaults.ssl = true;
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
/**
*Create .tpl on res to send data between middlewares
* Create .error on res to send error
*/

app.use(function (req, res, next) {
  res.tpl = {};
  res.tpl.error = [];
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return next();
})
/**
*Add the routes
*/
require('./routes/FestScanRoutes')(app,pg,connectionString,fs,path);
/**
*Handle the errors
*/
app.use(function(err,req,res,next){
	res.status(500).send('OMG What happend?!');
	console.error(err.stack);
});
var server = app.listen(port, function () {
	console.log("Server is running on port: 3000")
});