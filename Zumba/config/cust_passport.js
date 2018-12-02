const LocalStrategy = require('passport-local').Strategy;
const User = require ('../dbmodels/user');
const config = require ('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
	//Local Strategy
	passport.use(new LocalStrategy({
		usernameField: 'loginemail',
    	passwordField: 'loginpassword'
	},function(username, password, done){
		//Match username
		// const email = req.body.loginemail;
		// const password = req.body.loginpassword;
		console.log("email");
		console.log("password");
		let query = {email:username};
		User.findOne(query, function(err, user){
			if(err) throw err;
			if(!user){
				return done(null, false, {message: 'No user found'});

			}

		// hash pass first
		// bcrypt.genSalt(10, function(err, salt){
		// 	bcrypt.hash(password, salt, function(err,hash){
		// 		if(err){
		// 			console.log(err);
		// 		}
		// 		password = hash;
		// 		console.log('hashed');
		// 	});
		// });

			//Match password
			bcrypt.compare(password,user.password,function(err, isMatch){
				if(err) throw err;
				console.log('enter match password');
				if(isMatch){
					console.log('Success');
					return done(null, user);	
				}else{
					console.log('Wrong Password');
					return done(null, false, {message: 'Wrong Password'});
				}
			});

		});
	}));

	passport.serializeUser(function(user,done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id,done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});
}