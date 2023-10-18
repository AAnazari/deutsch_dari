const passport = require('passport');
const passportlocal = require('passport-local').Strategy;
const UserM = require('../models/user');

passport.use( new passportlocal(
    { 
      /*//////////////// It is based on the 'login.ejs' file. If the input names in 'login.ejs'
       are different from the verify method, then we should use them as following.
       *////////////////////////////////////////////////////////////////
          usernameField: 'email',
          passwordField: 'password',
    },    
    async (email, password, done) => {
        try {
          const user = await UserM.User.findOne({ email });
          // If email does NOT exist
          if (!user) {
            return done(null, false, { message: 'User is not found', });
          }
          // Email exist and now we need to verify the password
          const isMatch = await user.isValidPassword(password);
          return isMatch ? done(null, user) : done(null, false, { message: 'Incorrect password' });
        } catch (error) {
          done(error);
        }
      }
 /**  
    function(email, password, done){
        UserM.User.findOne({email}, function(err, user){
            if (err) { return done(err); }
            if (!user) { return done(null, false, {Message: 'User not found'}); }
            if (!user.isValidPassword(password)) { return done(null, false, {Message: 'Password is incorrect'}); }
            return done(null, user);
        });
    }
*/
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser( async function (id, done) {
  try {
    const user = await UserM.User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

/*///////////////////////////////
passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    cb(err, user);
  });
});
/////////////////////////////////*/
  