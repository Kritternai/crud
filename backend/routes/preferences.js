const express = require('express');
const router = express.Router();
const passport = require('passport');

function restInit(
    readcfg, 
    dbase, 
)  {

  let cfg = readcfg(false)

  router.get('/getConfig', function(req, res) {    
    // console.log('/getConfig ->', req.body);
    cfg = readcfg(false)
    return res.json(cfg);
  });

  router.post('/createDocument', passport.authenticate('jwt', { session: false }), function(req, res) {

    console.log('/createDocument ->', req.body.collection);

    let base = null
    if (req.body.base) base = req.body.base

    // const resp = await createDocument({
    //   base: base,
    //   collection: req.body.collection,
    //   data: JSON.stringify(req.body.data),
    //   options: options,
    // }, dbase)

    dbase.createDocument({
      collection: req.body.collection,
      data: JSON.stringify(req.body.data),
    }, (err, resp) => {
      if (resp)  {
        if (resp.collection == 'error')  return res.json(null)
        else  return res.json(JSON.parse(resp.data))
      }
      else  return res.json(null)
    });  

  });

  router.post('/readDocument', passport.authenticate('jwt', { session: false }), function(req, res) {
    console.log('/readDocument ->', req.body.collection);

    let base = null
    if (req.body.base) base = req.body.base

    let populate = null
    if (req.body.populate) populate = JSON.stringify(req.body.populate)

    let select = null
    if (req.body.select) select = JSON.stringify(req.body.select)

    // const resp = await readDocument({
    //   base: base,
    //   collection: req.body.collection,
    //   query: JSON.stringify(req.body.query),
    //   populate: populate,
    //   select: select,
    //   options: options,
    // }, dbase)

    dbase.readDocument({
      collection: req.body.collection,
      query: JSON.stringify(req.body.query),
      populate: populate,
      select: select,
    }, (err, resp) => {
      // console.log(err, resp)
      if (resp)  {
        if (resp.collection == 'error')  return res.json(null)
        else  return res.json(JSON.parse(resp.data))  
      }
      else  return res.json(null)
    });      

  });
    
  router.post('/updateDocument', passport.authenticate('jwt', { session: false }), function(req, res) {
      console.log('/updateDocument ->', req.body);

      let base = null
      if (req.body.base) base = req.body.base

      // const resp = await updateDocument({
      //   base: base,
      //   collection: req.body.collection,
      //   query: JSON.stringify(req.body.query),
      //   data: JSON.stringify(req.body.data),
      //   options: options,
      // }, dbase)

      dbase.updateDocument({
        collection: req.body.collection,
        query: JSON.stringify(req.body.query),
        data: JSON.stringify(req.body.data),
      }, (err, resp) => {
        // console.log(err, resp)
        if (resp)  {
          if (resp.collection == 'error')  return res.json(null)
          else  return res.json(JSON.parse(resp.data))  
        }
        else  return res.json(null)
      });

  });

  router.post('/deleteDocument', passport.authenticate('jwt', { session: false }), function(req, res) {
    console.log('/deleteDocument ->', req.body.collection);

    let base = null
    if (req.body.base) base = req.body.base

    // const resp = await deleteDocument({
    //   base: base,
    //   collection: req.body.collection,
    //   query: JSON.stringify(req.body.query),
    // }, dbase)

    dbase.deleteDocument({
      collection: req.body.collection,
      query: JSON.stringify(req.body.query),
    }, (err, resp) => {
      // console.log(err, resp)
      if (resp)  {
        if (resp.collection == 'error')  return res.json(null)
        else  return res.json(JSON.parse(resp.data))  
      }
      else  return res.json(null)
    });  

  });

  router.post('/dropDatabase', passport.authenticate('jwt', { session: false }), function(req, res) {
    console.log('/dropDatabase ->', req.body, );
    // await dropDatabase(req.body);
    dbase.dropDatabase(req.body, (err, resp) => {
      return res.json({ status: true });
    })
  });

  router.post('/dropCollection', passport.authenticate('jwt', { session: false }), function(req, res) {
    console.log('/dropCollection ->', req.body, );
    dbase.dropCollection(req.body, (err, resp) => {  // { baseName: temp[0].siteID, collection: 'devices' }
      return res.json({ status: true });
    });   
  });

}

module.exports = {
  restInit: restInit,
  router: router,
};
