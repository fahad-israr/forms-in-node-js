//To enable you may need to enable less secure app for your account
//For Gmail goto https://myaccount.google.com/lesssecureapps


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'user@gmail.com',
      pass: 'samplepassword'
    }
  });


exports.list = function(req, res){

    req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM workshop',function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
                  
                  console.log(rows);
              res.render('workshops',{page_title:"Conducting Workshop",data:rows});
                  
             
           });
           
           //console.log(query.sql);
      });
    
  };
  

  exports.add = function(req, res){
    res.render('add_workshop',{page_title:"Registration: Conduct a Workshop "});
  };
  
  exports.edit = function(req, res){
      
      var id = req.params.id;
      
      req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM workshop WHERE id = ?',[id],function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              res.render('edit_workshop',{page_title:"Edit Workshops",data:rows});
                  
             
           });
           
           //console.log(query.sql);
      }); 
  };


  /*Utility Function to Convert Date from  yyyy-mm-dd to dd-mm-yyyy*/
  function convertDate(dateString){
      console.log(dateString);
    var p = dateString.split(/\D/g)
    return [p[2],p[1],p[0] ].join("-")
    }



  /*Save the workshop*/
  exports.save = function(req,res){
      
      var input = JSON.parse(JSON.stringify(req.body));
      
      req.getConnection(function (err, connection) {
        if (err) throw err;
        
       
          
          var data = {
            
            institute : input.institute,
            address : input.address,
            ws_name : input.ws_name,
            start_date_a : convertDate(input.start_date_a),
            end_date_a : convertDate(input.end_date_a),
            start_date_b : convertDate(input.start_date_b),
            end_date_b : convertDate(input.end_date_b),
            start_date_c : convertDate(input.start_date_c),
            end_date_c : convertDate(input.end_date_c),
            accept_guidelines: input.accept_guidelines,
            coordinator : input.coordinator,
            designation: input.designation,
            department : input.department,
            mobile : input.mobile,
            email : input.email,
            attended_before: input.attended_before,
            attended_ws_name: input.attended_ws_name,
            atteded_start_date: input.atteded_start_date,
            attended_end_date: input.attended_end_date,
            attended_submit_assignment:input.attended_submit_assignment
             
             
             
             
          };
          
          var query = connection.query("INSERT INTO workshop set ? ",data, function(err, rows)
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
  };
  
  exports.save_edit = function(req,res){
      
      var input = JSON.parse(JSON.stringify(req.body));
      var id = req.params.id;
      
      req.getConnection(function (err, connection) {
          
            var data = {
    
              institute : input.institute,
              address : input.address,
              ws_name : input.ws_name,
              start_date_a : convertDate(input.start_date_a),
              end_date_a : convertDate(input.end_date_a),
              start_date_b : convertDate(input.start_date_b),
              end_date_b : convertDate(input.end_date_b),
              start_date_c : convertDate(input.start_date_c),
              end_date_c : convertDate(input.end_date_c),
              accept_guidelines: input.accept_guidelines,
              coordinator : input.coordinator,
              designation: input.designation,
              department : input.department,
              mobile : input.mobile,
              email : input.email,
              attended_before: input.attended_before,
              attended_ws_name: input.attended_ws_name,
              atteded_start_date: input.atteded_start_date,
              attended_end_date: input.attended_end_date,
              attended_submit_assignment:input.attended_submit_assignment
            };
        
          
          connection.query("UPDATE workshop set ? WHERE id = ? ",[data,id], function(err, rows)
          {
    
            if (err)
                console.log("Error Updating : %s ",err );
           
            res.redirect('/workshops');
            
          });
      
      });
  };
  
  
  exports.delete_workshop = function(req,res){
            
       var id = req.params.id;
      
       req.getConnection(function (err, connection) {
          
          connection.query("DELETE FROM workshop  WHERE id = ? ",[id], function(err, rows)
          {
              
               if(err)
                   console.log("Error deleting : %s ",err );
              
               res.redirect('/workshops');
               
          });
          
       });
  };
  
  
  