const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();

module.exports = (
  passport, 
  dbase,
  privateKey,  
) => {

  // opts.secretOrKey = 'secret';
  opts.secretOrKey = privateKey;

  passport.use(new JWTStrategy(opts, (jwt_payload, resp) => {
    console.log('passport ->', jwt_payload.userName, )
    dbase.readDocument({ 
      base: '',
      collection: 'User',
      query: JSON.stringify({ userName: jwt_payload.userName, }),
    }, (err, resp2) => {
      let user = { userName: '' }
      if (resp2 && resp2.collection != 'error')  user = JSON.parse(resp2.data)
      // console.log('Passport ->', user);
      if (err)  {
        console.log('\x1b[31m%s\x1b[0m', 'passport -> Users database connection error!');
        return resp(null, {
          text: 'Users database connection error!',
        });
        // return resp(null, null)
      }
      else  {
        if (user.userName == '')  {
          return resp(null, {
            text: 'Users token error!',
          });
          // return resp(null, null)
        }
        else  {
          user.text = null;
          return resp(null, user);
        }
      }
    })
  }));
}