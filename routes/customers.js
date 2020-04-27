
/*
 * GET users listing.
 */


exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM customer',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
                
                console.log(rows);
            res.render('customers',{page_title:"Attending Workshop",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.add = function(req, res){
  res.render('add_customer',{page_title:"Workshop Registration"});
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM customer WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_customer',{page_title:"Edit Customers - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the customer*/
exports.save = function(req,res){
    
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
            has_mic:input.has_mic
        
        };
        
        var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
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
            has_mic:input.has_mic
        
        };
        
        connection.query("UPDATE customer set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/customers');
          
        });
    
    });
};


exports.delete_customer = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM customer  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/customers');
             
        });
        
     });
};


