var express = require('express');
var router = express.Router();
var UsersModel = require('../schema/user_table');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/add-user', function(req, res, next) {
  res.render('add-user', { title: 'Express' });
});
router.get('/save-user', function(req, res, next) {
  res.render('save-user', { title: 'Express' });
});

//Display Users
router.get('/display-user', function(req, res, next) {

  UsersModel.find(function(err ,db_user_array)
  {
    if(err)
       console.log("Error in Fetch Data" + err);
    else
      {
        console.log(db_user_array);
        res.render('display-user' , {user_array : db_user_array});
      }
  });
});

// Save User
router.post('/add-user', function(req, res, next) {
  const formdata={
    user_name : req.body.name,
    user_email : req.body.email,
    user_mobile : req.body.number,
  }
  var data = UsersModel(formdata);

  data.save(function(err)
  {
     if(err)
        console.log("Error in INSERT record");
     else
        res.render('index');
  })

  
});

//Display Single User By ID
router.get('/show/:id' , function(req,res){
  console.log(req.params.id);
  UsersModel.findById(req.params.id, function(err, db_user_array){
    if(err)
    console.log("Error in Single Record Fetch");
    else{
         console.log(db_user_array);
         res.render('single-record', {user_array : db_user_array});
    }
  });
  });

//Delete Single User By ID
router.get('/delete/:id' , function(req,res){
  console.log(req.params.id);
  UsersModel.findByIdAndDelete(req.params.id, function(err, db_user_array ){
    if(err)
    {
    console.log("Error in Single Record Delete" + err);
    res.redirect('/display-user');
    }
    
    else{
        
         console.log("Record Deleted");
         res.redirect('/display-user');
    }
  });
  });
  


//Edit Single User By ID
router.get('/edit/:id' , function(req,res){
  console.log(req.params.id);

  UsersModel.findById(req.params.id, function(err, db_user_array ){
    if(err)
    {
    console.log("Error in Single Record Edit" + err);
    }
    
    else
    {
         console.log(db_user_array);
         res.render('edit-record' , {user_array : db_user_array});
    }
  });
  });


//Update Record using POST Method
router.post('/edit/:id' , function(req,res){
  console.log("Edit ID is"+req.params.id);

  const mybodydata={

    user_name : req.body.user_name ,
    user_email : req.body.user_email ,
    user_mobile : req.body.user_mobile

  }
  UsersModel.findByIdAndUpdate(req.params.id, mybodydata ,function(err){
    if(err)
    {
    console.log("Error in Record Update " + err);
    res.redirect('/dispay-user');
    }
    
    else
    {
         res.redirect('/display-user');
    }
  });
  });

module.exports = router;
