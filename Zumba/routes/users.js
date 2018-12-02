const express= require('express');
const expressValidator = require('express-validator');
const router =express.Router();
const bcrypt= require('bcryptjs');
const flash = require('express-flash-messages');
const cust_passport = require('passport');

//import User model
let User = require('../dbmodels/user');
router.use(expressValidator());
router.use(flash());


//Register User process
router.post('/register',function(req,res){

	const name = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;

	console.log(name);

	// req.checkBody('name','Name is required').notEmpty();
	// req.checkBody('email','Email is required').notEmpty();
	// req.checkBody('email','Email is not vaild').isEmail();
	// req.checkBody('password','Password is required').notEmpty();
	// req.checkBody('confirmPassword','Passwords do not match').equals(req.body.password);

	let errors = req.validationErrors();
	console.log(email);
	if(errors){
		req.flash('fail','error');
		console.log("ERRORS!");
		console.log(errors);
		res.redirect('/index');

	}else{
		console.log("No error");
		const newUser = new User();
		newUser.name=name;
		newUser.email=email;
		newUser.password=password;
		// {
		// 	name:name,
		// 	email:email,
		// 	password:password
		// }


		bcrypt.genSalt(10, function(err, salt){
			bcrypt.hash(newUser.password, salt, function(err,hash){
				if(err){
					console.log(err);
				}
				newUser.password = hash;
				newUser.save(function(err){
					if(err){
						console.log(err);
						return;
					} else{
						console.log("Success");
						req.flash('sucess','You are now registered, please log in to continue');
						res.redirect('/index');
					}
				});
			});
		});
	}
});

//Login request
router.post('/login', function(req, res, next){
	const email = req.body.loginemail;
	const password = req.body.loginpassword;
	console.log(email);
	console.log(password);
	cust_passport.authenticate('local',{
		successRedirect:'/main',
		failureRedirect:'/',
		failureFlash: 'Error'
	})(req,res,next);
});
 

 //login
// router.post('/login', 
//     passport.authenticate('local', { failureRedirect: '/pages/login', failureFlash: true }),
//     function(req, res) {
//         res.redirect('/');
// });


module.exports = router;