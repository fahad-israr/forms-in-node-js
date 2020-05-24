
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

var multer = require('multer')
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

 
const DIR = './public/uploads';


let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR);
  },
  filename: function (req, file, cb) {
    console.log(JSON.parse(JSON.stringify(req.body)));
    cb(null, file.fieldname +'_'+ file.originalname.substring(0,file.originalname.indexOf('.'))+'_' + Date.now() + path.extname(file.originalname));
  }
});

let upload = multer({storage: storage});

function convertDate(dateString){
  console.log(dateString);
var p = dateString.split(/\D/g)
return [p[2],p[1],p[0] ].join("-")
}

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

app.post('/api/v1/upload',upload.single('category_certificate'), function (req, res) {
  console.log(Date.now());
var certificate="";
    if (!req.file) {
        console.log("No file received");
          message = "Error! in image upload."
        
    
      } else {
        console.log('file received');
        console.log(req.file);
        certificate=req.file.filename;
      }
        /*var sql = "INSERT INTO `file`(`name`, `type`, `size`) VALUES ('" + req.file.filename + "', '"+req.file.mimetype+"', '"+req.file.size+"')";
 
                var query = db.query(sql, function(err, result) {
                   console.log('inserted data');
                });
        message = "Successfully! uploaded";
        res.render('index',{message: message, status:'success'});*/
        var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
      
        
        var data = {

            ws_name : input.ws_name,
            name    : input.name,
            gender  : input.gender,
            email   : input.email,
            phone   : input.phone,
            alt_phone: input.alt_phone,
            designation: input.designation,
            qualification : input.qualification,
            department : input.department,
            institute :input.institute,
            address:input.address,
            typeofinst: input.typeofinst,
            subjects:input.subjects,
            no_of_workshops:input.no_of_workshops,
            teach:input.teach,
            research:input.research,
            industry:input.industry,
            category: input.category,
            lms: input.lms,
            lms_info: input.lms_info,
            exposure: input.exposure,
            willing:input.willing,
            has_computer:input.has_computer,
            has_internet:input.has_internet,
            has_webcam:input.has_webcam,
            has_mic:input.has_mic,          
            category_certificate : certificate,
            transaction_reference_number : input.transaction_reference_number,
            transaction_date: convertDate(input.transaction_date),
            transaction_mode:input.transaction_mode,

            amount_paid : input.amount_paid
        
        };
        //console.log(data);
        
        var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows)
        {
        
          if (err){
              res.redirect('/fail');
              console.log("Error inserting : %s ",err );
            }
              else{

            /*var mailOptions = {
            from: 'fahad00cms@gmail.com',
            to: data.email,
            subject: 'Welcome to Virtual Learning Academy',
            text: 'This is some random text'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });*/

              
          res.redirect('/success');
            }
          
        });
        
       // console.log(query.sql); get raw query
    
    });
 
      
});

app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
