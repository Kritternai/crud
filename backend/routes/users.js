const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

function readDocument (coll, dbase)  {
  return new Promise(resolve => {
    dbase.readDocument(coll, (err, resp) => {
      // console.log(err, resp)
      if (resp)  {
        if (resp.collection == 'error')  resolve(null)
        else  resolve(JSON.parse(resp.data))  
      }
      else  resolve(null)
    });  
  });
}

function deleteDocument (coll, dbase)  {
  return new Promise(resolve => {
    dbase.deleteDocument(coll, (err, resp) => {
      // console.log(err, resp)
      if (resp)  {
        if (resp.collection == 'error')  resolve(null)
        else  resolve(JSON.parse(resp.data))  
      }
      else  resolve(null)
    });  
  });
}

const userInit = (dbase, privateKey) => {
    
  const staffs = [
    {
      email: 'email@gmail.com',
      code: '123456',
    },
  ];

  function createPassword (password)  {
    return new Promise(resolve => {
      bcrypt.genSalt(10, (err, salt) => {
        if(err) {
          console.error('There was an error', err);
          resolve('')
        }
        else {
          bcrypt.hash(password, salt, (err, hash) => {
            if(err) {
              console.error('There was an error', err);
              resolve('')
            }
            else {
              // console.log('hash =>', hash);
              resolve(hash);
            }
          });
        }
      });
    });    
  }

  function codeCompare (code, email)  {
    return new Promise(resolve => {
      bcrypt.compare(code, email).then(isMatch => {
        resolve(isMatch)      
      })
    });    
  }

  router.post('/register', function(req, res) {
    (async () => {  
      // console.log('/register =>', req.body);
      for (var i in staffs)  { 
        if (staffs[i].email == req.body.email)  {

          const resp = await readDocument({
            collection: 'User',
            query: JSON.stringify({}),
            select: JSON.stringify('userName userLevel'),
          }, dbase)
          // console.log('All users ->', resp)
          if (resp)  {
            for (let i in resp)  {
              if (resp[i].userLevel == 'super-admin' && resp[i].userName == req.body.userName)  {
                await deleteDocument({
                  collection: 'User',
                  query: JSON.stringify({ _id: resp[i]._id }),
                }, dbase)  
              }
            }
          }

          let pwd = await createPassword(req.body.password);
          let reg = await createPassword(req.body.regcode);
          let obj = {
            _id: req.body.userName,
            // serverID: '',
            // siteID: '',
            userName: req.body.userName,
            fullName: req.body.userName,
            userLevel: 'super-admin',
            userState: 'confirm',
            // email: req.body.email,
            email: reg,
            password: pwd,
            dateCreate: new Date(),
            dateExpire: null,
          }
          // dbase.updateUser(obj, (err, user) => {
          dbase.createDocument({
            collection: 'User',
            data: JSON.stringify(obj),
          }, (err, resp) => {
            if (resp)  {
              if (resp.collection == 'error')  console.log('updateDocument -> super-admin error!')
              else  console.log('updateDocument -> super-admin', JSON.parse(resp.data))
            }
            else  console.log('updateDocument -> super-admin error!')
            // console.log(err, user);
            res.json({
              text: 'Register already done!',
              userName: req.body.userName,
              userLevel: 'super-admin',
            })
          })
          return;
        }
      }
      res.json({
        text: 'Register error!',
        userName: null,
        userLevel: null,
      })
    })();   
  });

  router.post('/login', (req, res) => {
    // (async () => {  
      // console.log('/login =>', req.body);
      const userName = req.body.userName;
      const password = req.body.password;
      dbase.readDocument({ 
        base: '',
        collection: 'User',
        query: JSON.stringify({ userName: userName, }),
      }, (err, resp2) => {
        let user = { userName: '' }
        if (resp2 && resp2.collection != 'error')  user = JSON.parse(resp2.data)
        // console.log('User ->', err, resp2, user);       
        if (err)  {
          res.json({
            text: 'Users database error!',
            token: null,
          })
          return;  
        }     
        if (user.userName == '')  {
          res.json({
            text: 'Username not found!',
            token: null,
          })
          return;  
        }
        bcrypt.compare(password, user.password).then(isMatch => {
          if(isMatch) {
            const payload = {
              _id: user._id,
              // serverID: user.serverID,
              // siteID: user.siteID,
              userName: user.userName,
              userLevel: user.userLevel,
              userState: user.userState,
              groups: user.groups,
              sites: user.sites,
            }

            jwt.sign(payload, privateKey, {
              expiresIn: 60*60*24*1

            /* jwt.sign(payload, privateKey, {
              algorithm: 'ES256',              
              expiresIn: 60*60*24*1 */

            }, (err, token) => {
              (async () => {  
              if(err) {
                res.json({
                  text: 'There is some error in token!',
                  token: null,
                })
              }
              else {
                /* console.log(user)
                let text = 'Login success!';
                if (user.userState == 'waiting')  text = 'Your account is not confirm!';
                res.json({
                  text: text,
                  token: `Bearer ${token}`
                })*/
                if (user.userLevel === 'super-admin')  {
                  let text = 'Login failed!';
                  let temp = null
                  for (var i in staffs)  {
                    let reg = await codeCompare(staffs[i].code, user.email)
                    if (reg)  {
                      text = 'Login success!';
                      temp = `Bearer ${token}`
                      break
                    }
                  }
                  // console.log(user, text, temp)
                  res.json({
                    text: text,
                    token: temp
                  })
                }
                else  {
                  let text = 'Login success!';
                  if (user.userState == 'waiting')  text = 'Your account is not confirm!';
                  res.json({
                    text: text,
                    token: `Bearer ${token}`
                  })  
                }
              }
            })();   
            });
          }
          else {
            res.json({
              text: 'Username or password incorrect!',
              token: null,
            })
          }                  
        }); 
      })
    // })();   
  });

  router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {  
    console.log('/me =>', req.user.text);
    if (!req.user.text)  {
      return res.json({
        _id: req.user._id,
        displayName: req.user.userLevel,
        userName: req.user.userName,
        email: req.user.email,
        // serverID: req.user.serverID,
        // siteID: req.user.siteID,
        groups: req.user.groups,
        sites: req.user.sites,
        text: null,
      });
    }
    else  {
      return res.json({
        text: 'Token error!',
      });
    }
  });

}

module.exports = {
  userInit: userInit,
  router: router,
}

