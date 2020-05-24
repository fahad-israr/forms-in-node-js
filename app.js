
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load participants route
var participants = require('./routes/participants'); 
var workshops= require('./routes/workshops');
var fail=require('./routes/fail');
var success=require('./routes/success');
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'localhost', //'localhost',
        user: 'userEHX',
        password : 'hMmx56FN4GHpMXOl',
        port : 3306, //port mysql
        database:'sampledb',

    },'pool') //or single

);



app.get('/', routes.index);
app.get('/fail',fail.index);
app.get('/success',success.index);
//app.get('/participants', participants.list);
app.get('/participants/add', participants.add);
app.post('/participants/add', participants.save);
//app.get('/participants/delete/:id', participants.delete_participant);
//app.get('/participants/edit/:id', participants.edit);
//app.post('/participants/edit/:id',participants.save_edit);
//app.post('/participants/view/:id',participants.view);
app.get('/workshops/add',workshops.add);
app.post('/workshops/add',workshops.save);
//app.get('/workshops/delete/:id', workshops.delete_customer);
//app.get('/workshops/edit/:id', workshops.edit);
//app.post('/workshops/edit/:id',workshops.save_edit);

app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
